import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {GradientText, GradientView} from '../_common/Gradient';
import {ScrollView} from 'react-native-gesture-handler';
// import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const GenreTabs = ({data, activeTab, onSelect, scrollX}) => {
  const tabRef = useRef();
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
            console.log(x, width, y, height);
            m.push({x, y, width, height});
            if (m.length === data.length) {
              SetTabWidths(m);
            }
          },
          err => console.log(err),
        );
      });
    }
  }, [data]);
  console.log('mList', tabWidths, data);

  useEffect(() => {
    // if (
    //   tabWidths?.length > 0 &&
    //   tabWidths[activeTab]?.x + tabWidths[activeTab]?.width >= width
    // ) {
    //   tabContainerRef?.current?.scrollTo({
    //     x: tabWidths[activeTab]?.x + tabWidths[activeTab]?.width + 50 - width,
    //     animated: true,
    //   });
    // } else {
    //   tabContainerRef?.current?.scrollTo({
    //     x: 0,
    //     animated: true,
    //   });
    // }
  }, [activeTab]);

  const SelectedView = useMemo(() => {
    if (tabWidths?.length > 0) {
      console.log('test pass');
      return <Text>Hi</Text>;
    }
  }, [tabWidths, scrollX, data]);

  console.log('SelectedView', SelectedView);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: 'red',
      }}
      ref={tabRef}>
      {tabWidths?.length > 0 && (
        <Indigator scrollX={scrollX} tabWidths={tabWidths} />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // style={{}}
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
        {SelectedView}
      </ScrollView>
    </View>
  );
};

export default GenreTabs;

const styles = StyleSheet.create({});

const Tab = forwardRef(({item, isActive, onPress}, tabRef) => {
  return (
    <View ref={tabRef}>
      {isActive ? (
        <View style={{padding: 4, margin: 4}}>
          <GradientText style={{fontSize: 22, color: '#fff'}}>
            {item.name}
          </GradientText>
          <View style={{height: 3, width: '50%'}}>
            <GradientView />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={{padding: 4, margin: 4}} onPress={onPress}>
          <Text style={{fontSize: 20, color: '#fff'}}>{item.name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const Indigator = ({tabWidths, scrollX}) => {
  console.log(tabWidths);
  const inputRange = tabWidths.map((_, i) => i);
  const indigatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: tabWidths.map(data => data.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: tabWidths.map(data => data.x),
  });
  console.log(translateX, indigatorWidth);
  return (
    <Animated.View
      style={{
        height: 3,
        width: indigatorWidth,
        backgroundColor: '#fff',
        // position: 'absolute',
        // bottom: 0,
        transform: [{translateX}],
      }}></Animated.View>
  );
};
