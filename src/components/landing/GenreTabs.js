import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';

const {width} = Dimensions.get('screen');

const GenreTabs = ({data, activeTab, onSelect}) => {
  const tabRef = useRef();
  const tabContainerRef = useRef();
  const [tabWidths, SetTabWidths] = useState([]);
  useEffect(() => {
    if (data.length) {
      let m = [];
      data.forEach(item => {
        console.log(item.ref, tabContainerRef);
        item?.ref?.current?.measureLayout(
          tabContainerRef.current,
          (x, y, width, height) => {
            m.push({x, y, width, height});
            if (m.length === data.length) {
              SetTabWidths(m);
            }
          },
        );
      });
    }
  }, [data]);
  //   console.log('mList', tabWidths, data);

  useEffect(() => {
    console.log('active', tabWidths[activeTab], width);

    if (
      tabWidths?.length > 0 &&
      tabWidths[activeTab]?.x + tabWidths[activeTab]?.width >= width
    ) {
      tabContainerRef?.current?.scrollTo({
        x: tabWidths[activeTab]?.x + tabWidths[activeTab]?.width - width,
        animated: true,
      });
    } else {
      tabContainerRef?.current?.scrollTo({
        x: 0,
        animated: true,
      });
    }
  }, [activeTab]);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={tabContainerRef}>
        {data.map((val, index) => {
          return (
            <Tab
              key={val.id}
              item={val}
              ref={val.ref}
              isActive={index === activeTab}
              onPress={() => onSelect(index)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GenreTabs;

const styles = StyleSheet.create({});

const Tab = forwardRef(({item, isActive, onPress}, tabRef) => {
  return (
    <TouchableOpacity
      style={{padding: 4, margin: 4}}
      onPress={onPress}
      ref={tabRef}>
      <Text style={{fontSize: 18, color: isActive ? 'green' : '#fff'}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
});
