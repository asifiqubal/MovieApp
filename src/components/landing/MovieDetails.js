import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {api} from '../../_config/api';
import {useDispatch} from 'react-redux';
import {GetMovieDetails, GetReletedMovie} from '../../redux/actions/Movie';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import ui from '../../_config/ui';
import {Time} from '../_common/Utils';
import {GetReletedTvShows, GetTvShowDetails} from '../../redux/actions/Tv';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');
const MovieDetails = ({navigation, route}) => {
  const {item} = route.params;
  //   console.log(item);
  const isMovie = item.type === 'movie';
  const dispatch = useDispatch();
  const mounted = useRef(true);
  const [details, SetDetails] = useState(null);
  const [isLoading, SetLoading] = useState(false);
  const [similar, SetSimilar] = useState([]);

  const getMovieDetails = async () => {
    try {
      SetLoading(true);
      const details = await dispatch(GetMovieDetails(item.id));
      //   console.log(details);
      if (!mounted.current) {
        return null;
      }
      SetDetails(details);
      const {results} = await dispatch(GetReletedMovie(item.id));
      SetSimilar(results);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      return Promise.reject(error);
    }
  };

  const getTvDetails = async () => {
    try {
      SetLoading(true);
      const details = await dispatch(GetTvShowDetails(item.id));
      //   console.log(details);
      if (!mounted.current) {
        return null;
      }
      SetDetails(details);
      const {results} = await dispatch(GetReletedTvShows(item.id));
      //   console.log(details);

      SetSimilar(results);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (item) {
      if (item.type === 'movie') {
        getMovieDetails().then().catch();
      } else {
        getTvDetails().then().catch();
      }
    }
  }, [item]);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: [api.img_url, item.backdrop_path].join('')}}
          style={{width, flex: 1}}
          resizeMode="cover"
        />
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 0.0, y: 1.25}}
          locations={[0.0, 1.0]}
          colors={['#ffffff10', '#000']}
          useViewFrame={false}
          style={styles.shadowGredient}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <MIcon
            name="arrow-back-ios"
            size={32}
            color={ui.color.white}
            style={{marginLeft: 6}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{marginHorizontal: 16}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{item?.name || item.title}</Text>
        <View style={styles.optionContainer}>
          {isMovie ? (
            <View style={styles.runtimeContainer}>
              <MCIcon
                name="clock-time-three-outline"
                size={26}
                color={ui.color.white}
              />
              <Text style={{fontSize: 16}}>{details?.runtime} minutes</Text>
            </View>
          ) : (
            <View style={styles.runtimeContainer}>
              <MCIcon
                name="format-list-numbered"
                size={26}
                color={ui.color.white}
              />
              <Text style={{fontSize: 16}}>
                Total Season {details?.number_of_seasons}
              </Text>
            </View>
          )}
          <View style={styles.rating}>
            <MCIcon name="star" size={26} color={ui.color.white} />
            <Text style={{fontSize: 16, marginLeft: 4}}>
              {details?.vote_average} (TMDb)
            </Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.subTitle}>
              {isMovie ? 'Release Date' : 'First Release'}
            </Text>
            <Text>
              {Time.FullMDY(
                isMovie ? details?.release_date : details?.first_air_date,
              )}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.subTitle}>Genre</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {details?.genres?.map(val => (
                <Text style={styles.genre} key={'genre_key_' + val.id}>
                  {val.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={{padding: 8, marginHorizontal: 8}}>
          <Text style={styles.subTitle}>Synopsis</Text>
          <Text>{item.overview}</Text>
        </View>
        <View style={{padding: 8, marginHorizontal: 8}}>
          <Text style={[styles.subTitle, {marginBottom: 4}]}>
            Releted {item?.type === 'movie' ? 'Movies' : 'Tv Shows'}
          </Text>
          <FlatList
            data={similar}
            keyExtractor={item => 'similar' + item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{width: width * 0.28}}>
                <Image
                  source={{
                    uri: [api.img_url, item.poster_path].join(''),
                  }}
                  resizeMode="cover"
                  style={styles.similarImg}
                />
                <Text style={styles.similarTxt}>
                  {item?.name || item?.title}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  imageContainer: {height: 250, marginBottom: 16},
  shadowGredient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000040',
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  title: {
    color: ui.text.white,
    fontSize: 26,
    fontWeight: '500',
    marginHorizontal: 8,
    padding: 8,
  },
  runtimeContainer: {flexDirection: 'row', flex: 1},
  optionContainer: {flexDirection: 'row', padding: 8, margin: 8},
  rating: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  subTitle: {color: ui.color.white, fontSize: 18, fontWeight: '700'},
  genre: {
    borderColor: ui.color.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 32,
    backgroundColor: ui.color.background_light,
    color: ui.text.white,
    justifyContent: 'center',
    height: 36,
    alignContent: 'center',
    marginRight: 8,
    marginVertical: 4,
  },
  similarImg: {
    width: width * 0.25,
    height: 150,
    borderRadius: 16,
  },
  similarTxt: {
    color: ui.text.white,
    fontSize: 16,
    width: width * 0.25,
    paddingHorizontal: 4,
  },
});
