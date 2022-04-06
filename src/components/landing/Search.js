import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import ui from '../../_config/ui';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const Search = ({searchText, OnChangeText}) => {
  return (
    <View>
      <View style={styles.searchContainer}>
        <FAIcon name="search" size={24} color={ui.color.white_light} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={ui.text.light}
          value={searchText}
          onChangeText={val => OnChangeText(val.trim())}
          style={styles.searchInput}
        />
        {searchText?.length > 0 && (
          <FAIcon
            name="close"
            size={24}
            style={{marginRight: 6}}
            onPress={() => OnChangeText('')}
          />
        )}
      </View>
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
    color: ui.text.white,
  },
});
