import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import ui from '../../_config/ui';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import {GetMovieGenres} from '../../redux/actions/Genre';
import {GetMovieListByGenre} from '../../redux/actions/Movie';
import GenreTabs from './GenreTabs';
import MovieList from './MovieList';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {GradientMaskView} from '../_common/Gradient';
import {SearchMulti} from '../../redux/actions/Search';
import {api} from '../../_config/api';
import MaskedView from '@react-native-masked-view/masked-view';
const {width} = Dimensions.get('screen');

const Discover = props => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  // const {tabList} = useSelector(state => state.__discover);
  const tabRef = useRef();
  const movieRef = useRef();
  const [searchText, SetSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [searchResult, UpdateResult] = useState([]);
  const tabList = [
    {
      id: 'discover_movie_tab',
      name: 'Movies',
      url: 'discover/movie',
      ref: React.useRef(),
      type: 'movie',
    },
    {
      id: 'discover_tv_tab',
      name: 'Tv Series',
      url: 'discover/tv',
      ref: React.useRef(),
      type: 'tv',
    },
  ];
  const Init = async () => {
    await dispatch(GetMovieGenres());
    // await dispatch(GetMovieListByGenre(12));
  };

  const UpdateGenre = index => {
    setActiveTab(index);
    movieRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  useEffect(() => {
    if (searchText?.length > 2) {
      dispatch(SearchMulti(searchText))
        .then(({results}) => {
          if (results?.length > 0) {
            UpdateResult(results);
          }
        })
        .catch();
    } else UpdateResult([]);
  }, [searchText]);

  const SrcResView = useMemo(() => {
    if (searchResult?.length > 0) {
      return (
        <View style={styles.searchResult}>
          <FlatList
            data={searchResult}
            keyboardShouldPersistTaps="always"
            keyExtractor={val => 'search-' + val.id}
            renderItem={({item}) => (
              <SearchItem
                item={item}
                onSelect={() => {
                  SetSearchText('');
                  props.navigation.navigate('Details', {
                    item: {...item, type: item.media_type},
                  });
                }}
              />
            )}
          />
        </View>
      );
    }
  }, [searchResult]);

  useEffect(() => {
    Init().then().catch();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header text={'Find Movies, Tv series, and more..'} />
      <View>
        <Search searchText={searchText} OnChangeText={SetSearchText} />
        {SrcResView}
      </View>
      <GenreTabs
        data={tabList}
        tabRef={tabRef}
        activeTab={activeTab}
        onSelect={UpdateGenre}
        scrollX={scrollX}
      />

      <Animated.FlatList
        ref={movieRef}
        data={tabList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={val => val.id}
        renderItem={({item}) => (
          <MovieList item={item} navigation={props.navigation} />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={event => {
          // console.log(Math.c(event.nativeEvent.contentOffset.x / width));
          UpdateGenre(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
      />
      <Footer />
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
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: ui.text.primary,
    paddingHorizontal: 16,
  },
  footer: {
    height: 60,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResult: {
    maxHeight: 250,
    // height: 250,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: ui.color.background,
    position: 'absolute',
    top: 66,
    zIndex: 3,
  },
  itemImg: {
    height: 54,
    width: 50,
  },
  itemContainer: {
    height: 60,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    backgroundColor: ui.color.background_light,
    borderRadius: 8,
    margin: 4,
  },
});

const Header = ({text}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
        <MCIcon name="home" size={28} color={ui.color.white_light} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <GradientMaskView style={{fontSize: 22, color: '#fff', opacity: 0}}>
          <MCIcon name="play-circle" size={38} />
        </GradientMaskView>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <FAIcon name="user" size={28} color={ui.color.white_light} />
      </TouchableOpacity>
    </View>
  );
};

const SearchItem = ({item, onSelect}) => {
  return (
    <View>
      {item.media_type === 'movie' && (
        <TouchableOpacity style={styles.itemContainer} onPress={onSelect}>
          <Image
            source={{
              uri: [api.img_url, item.poster_path].join(''),
            }}
            resizeMode="contain"
            style={styles.itemImg}
          />
          <Text
            style={{color: ui.text.white, fontSize: 16, alignSelf: 'center'}}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      {item.media_type === 'tv' && (
        <TouchableOpacity style={styles.itemContainer} onPress={onSelect}>
          <Image
            source={{
              uri: [api.img_url, item.poster_path].join(''),
            }}
            resizeMode="contain"
            style={styles.itemImg}
          />
          <Text
            style={{color: ui.text.white, fontSize: 16, alignSelf: 'center'}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      {item.media_type === 'person' && (
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: [api.img_url, item.profile_path].join(''),
            }}
            resizeMode="contain"
            style={styles.itemImg}
          />
          <Text
            style={{color: ui.text.white, fontSize: 16, alignSelf: 'center'}}>
            {item.name}
          </Text>
        </View>
      )}
    </View>
  );
};
