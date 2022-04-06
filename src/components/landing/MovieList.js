import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {GetMovieGenres, GetTvGenres} from '../../redux/actions/Genre';
import {DiscoverFromTMDB} from '../../redux/actions/Discover';
import {api} from '../../_config/api';
import ui from '../../_config/ui';
import {GradientText} from '../_common/Gradient';

const {width} = Dimensions.get('screen');

const MovieList = ({item, navigation}) => {
  const dispatch = useDispatch();
  // console.log(navigation);

  const [isLoading, SetLoading] = useState(false);
  const [currentPage, SetPage] = useState(1);
  const [itemList, UpdateList] = useState([]);

  const Init = async () => {
    try {
      SetLoading(true);
      const {page, results, total_pages} = await dispatch(
        DiscoverFromTMDB(item.url),
      );
      // console.log(page);
      if (results) {
        UpdateList(page === 1 ? [...results] : [...itemList, ...results]);
        SetPage(page);
      }
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  const LoadMore = async () => {
    try {
      const {page, results, total_pages} = await dispatch(
        DiscoverFromTMDB(item.url, currentPage + 1),
      );
      // console.log(page);
      if (results) {
        UpdateList(page === 1 ? [...results] : [...itemList, ...results]);
        SetPage(page);
      }
    } catch (error) {}
  };

  useEffect(() => {
    Init().then().catch();
  }, []);

  let pi = 0;
  // console.log(item);
  return (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        extraData={itemList}
        keyExtractor={it => item.type + it.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        initialNumToRender={8}
        columnWrapperStyle={{
          alignItems: 'flex-start',
          width: width * 0.9,
        }}
        renderItem={data => (
          <Item
            item={data.item}
            onItemPress={() =>
              navigation.navigate('Details', {
                item: {...data.item, type: item.type},
              })
            }
          />
        )}
        onEndReachedThreshold={0.8}
        onEndReached={_ => {
          LoadMore().then().catch();
        }}
      />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    width: width * 0.45,
  },
  itemImg: {width: width * 0.4, height: 230, borderRadius: 16},
  itemTxt: {color: ui.text.white, fontSize: 16, paddingVertical: 4},
});

const Item = ({item, onItemPress}) => {
  // console.log(item);
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onItemPress}>
      <Image
        source={{
          uri: [api.img_url, item.poster_path].join(''),
        }}
        resizeMode="cover"
        style={styles.itemImg}
      />
      <Text style={styles.itemTxt}>{item?.name || item?.title}</Text>
    </TouchableOpacity>
  );
};
