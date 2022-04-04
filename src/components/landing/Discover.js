import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ui from '../../_config/ui';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import {GetMovieGenres} from '../../redux/actions/Genre';
import {GetMovieListByGenre} from '../../redux/actions/Movie';
import GenreTabs from './GenreTabs';
import MovieList from './MovieList';

const Discover = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {movie, movieList} = useSelector(state => state.__genre);
  const [searchText, SetSearchText] = useState('');

  const Init = async () => {
    await dispatch(GetMovieGenres());
    await dispatch(GetMovieListByGenre(12));
    console.log('gen', movie, movieList);
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
      <GenreTabs data={movieList} scrollX={scrollX} />
      <Animated.FlatList
        data={movieList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={val => val.id}
        renderItem={({item}) => <MovieList item={item} />}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
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
