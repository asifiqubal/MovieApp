import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {GradientText, GradientView} from '../_common/Gradient';
const {width} = Dimensions.get('screen');

const TabView = ({scrollX, data}) => {
  const tabContainerRef = useRef();
  const [tabWidths, SetTabWidths] = useState([]);
  useEffect(() => {
    if (data.length) {
      let m = [];
      data.forEach(item => {
        // console.log(item.ref, tabContainerRef);
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
  }, []);
  return (
    <View>
      <View style={{flexDirection: 'row'}} ref={tabContainerRef}>
        {data.map((val, index) => {
          return (
            <TabItem
              key={val.id}
              item={val}
              ref={val.ref}
              // isActive={index === activeTab}
              //   onPress={() => onSelect(index)}
            />
          );
        })}
      </View>
      {tabWidths.length > 0 && (
        <Indigator scrollX={scrollX} tabWidths={tabWidths} />
      )}
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({});

const TabItem = forwardRef(({item}, tabRef) => {
  return (
    <View style={{padding: 4, margin: 4}} ref={tabRef}>
      <GradientText style={{fontSize: 22, color: '#fff'}}>
        {item.name}
      </GradientText>
      <View style={{height: 3, width: '50%'}}>
        <GradientView />
      </View>
    </View>
  );
});

const Indigator = ({tabWidths, scrollX}) => {
  const inputRange =
    tabWidths?.length > 0 ? tabWidths.map((_, i) => i * width) : [0, 1];
  const indigatorWidth = scrollX.interpolate({
    inputRange,
    outputRange:
      tabWidths?.length > 0 ? tabWidths.map(data => data.width) : [0, width],
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: tabWidths?.length > 0 ? tabWidths.map(data => data.x) : [0, 0],
  });
  return (
    <Animated.View
      style={{
        height: 3,
        width: indigatorWidth,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        transform: [{translateX}],
      }}
    />
  );
};
