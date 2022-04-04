import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const MovieList = ({item}) => {
  return (
    <View style={{width, flex: 1, height: 300, backgroundColor: 'red'}}>
      <Text>{item.name}</Text>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({});
