import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ui from '../../_config/ui';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import {GetMovieGenres} from '../../redux/actions/Genre';
import {GetMovieListByGenre} from '../../redux/actions/Movie';
import GenreTabs from './GenreTabs';
import MovieList from './MovieList';
const {width} = Dimensions.get('screen');

const Discover = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {movie, movieList} = useSelector(state => state.__genre);
  const tabRef = useRef();
  const movieRef = useRef();
  const [searchText, SetSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const Init = async () => {
    await dispatch(GetMovieGenres());
    // await dispatch(GetMovieListByGenre(12));
    console.log('gen', movie, movieList);
  };

  const UpdateGenre = index => {
    console.log(index);
    setActiveTab(index);
    movieRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  useEffect(() => {
    console.log('gen-2', movie, movieList);
  }, [movie, movieList]);

  useEffect(() => {
    Init().then().catch();
  }, []);
  return (
    <View>
      <Header text={'Find Movies, Tv series, and more..'} />
      <Search searchText={searchText} OnChangeText={SetSearchText} />
      <GenreTabs
        data={movieList}
        tabRef={tabRef}
        activeTab={activeTab}
        onSelect={UpdateGenre}
      />
      <FlatList
        ref={movieRef}
        data={movieList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={val => val.id}
        renderItem={({item}) => <MovieList item={item} />}
        onMomentumScrollEnd={event => {
          // console.log(Math.c(event.nativeEvent.contentOffset.x / width));
          UpdateGenre(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
      />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  header: {
    minHeight: 100,
    justifyContent: 'center',
    paddingHorizontal: 8,
    margin: 4,
    paddingVertical: 4,
  },
  headerTetx: {
    fontSize: 24,
    fontWeight: '600',
    color: ui.text.primary,
    paddingHorizontal: 16,
  },
});

const Header = ({text}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTetx}>{text}</Text>
    </View>
  );
};
