import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import ui from '../../_config/ui';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const Search = ({searchText, OnChangeText}) => {
  return (
    <View style={styles.searchContainer}>
      <FAIcon name="search" size={24} />
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={OnChangeText}
        style={styles.searchInput}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    height: 56,
    backgroundColor: ui.color.background_light,
    width: '90%',
    alignSelf: 'center',
    margin: 4,
    paddingHorizontal: 16,
    paddingVertical: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 32,
    flexDirection: 'row',
  },
  searchInput: {
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1,
  },
});
