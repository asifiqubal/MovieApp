import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import React, {forwardRef, useEffect, useRef, useState} from 'react';

const {width} = Dimensions.get('screen');

export default function GenreTabs({data, scrollX}) {
  const containerRef = useRef();
  const [tabWidths, SetTabWidths] = useState([]);
  useEffect(() => {
    let m = [];
    data.forEach(item => {
      item?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          console.log(width);
          m.push({x, y, width, height});
          if (m.length === data.length) {
            SetTabWidths(m);
          }
        },
      );
    });
  }, []);
  console.log('mList', tabWidths);

  return (
    <View>
      <ScrollView
        style={{flexDirection: 'row', height: 60}}
        horizontal
        ref={containerRef}
        showsHorizontalScrollIndicator={false}>
        {data.map(val => {
          return <Tab key={val.id} item={val} ref={val.ref} />;
        })}
      </ScrollView>
      {tabWidths?.length > 0 && (
        <Indigator tabWidths={tabWidths} scrollX={scrollX} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

const Tab = forwardRef(({item}, ref) => {
  return (
    <View style={{padding: 4, margin: 4}} ref={ref}>
      <Text style={{fontSize: 18}}>{item.name}</Text>
    </View>
  );
});

const Indigator = ({tabWidths, scrollX}) => {
  const indigatorWidth = scrollX.interpolate({
    inputRange: tabWidths.map((_, i) => i * width),
    outputRange: tabWidths.map(data => data.width),
  });
  const translateX = scrollX.interpolate({
    inputRange: tabWidths.map((_, i) => i * width),
    outputRange: tabWidths.map(data => data.x),
  });
  return (
    <Animated.View
      style={{
        height: 3,
        width: indigatorWidth,
        backgroundColor: '#fff',
        transform: [{translateX}],
      }}
    />
  );
};
