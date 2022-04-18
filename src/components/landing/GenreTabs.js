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
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {GradientText, GradientView} from '../_common/Gradient';

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
            m.push({x, y, width, height});
            if (m.length === data.length) {
              SetTabWidths(m);
            }
          },
        );
      });
    }
  }, [data]);
  // console.log('mList', tabWidths, data);

  useEffect(() => {
    console.log(
      'active',
      tabWidths[activeTab],
      width,
      tabWidths[activeTab]?.x + tabWidths[activeTab]?.width - width,
    );

    if (
      tabWidths?.length > 0 &&
      tabWidths[activeTab]?.x + tabWidths[activeTab]?.width >= width
    ) {
      tabContainerRef?.current?.scrollTo({
        x: tabWidths[activeTab]?.x + tabWidths[activeTab]?.width + 50 - width,
        animated: true,
      });
    } else {
      tabContainerRef?.current?.scrollTo({
        x: 0,
        animated: true,
      });
    }
  }, [activeTab]);

  const SelectedView = useMemo(() => {
    console.log('Tab should', tabWidths);
    return;
  }, [tabWidths, scrollX, data]);

  // console.log('SelectedView', Indigator);

  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 8, margin: 4}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: 'red'}}
        ref={tabContainerRef}>
        {/* <View style={{height: 2, width: 50, backgroundColor: 'red'}} /> */}
        <Indigator tabWidths={tabWidths} scrollX={scrollX} />
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
  if (!tabWidths.length > 0) {
    return null;
  }

  const indigatorWidth = scrollX.interpolate({
    inputRange: tabWidths.map((_, i) => i * width),
    outputRange: tabWidths.map(data => data.width),
  });
  const translateX = scrollX.interpolate({
    inputRange: tabWidths.map((_, i) => i * width),
    outputRange: tabWidths.map(data => data.x),
  });
  console.log('Render Ind');
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
