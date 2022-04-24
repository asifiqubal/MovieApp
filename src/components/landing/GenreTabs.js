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
import {
  GradientView,
  TestTextMaskView,
  TransparentText,
} from '../_common/Gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {MotiView} from 'moti';
// import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const GenreTabs = ({data, activeTab, onSelect, scrollX}) => {
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

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        margin: 4,
      }}>
      <TestTextMaskView text={'Hi'} />

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
              tabWidths={tabWidths}
              scrollX={scrollX}
            />
          );
        })}
        {tabWidths?.length > 0 && (
          <Indicator scrollX={scrollX} tabWidths={tabWidths} />
        )}
      </ScrollView>
    </View>
  );
};

export default GenreTabs;

const styles = StyleSheet.create({});

const Tab = forwardRef(
  ({item, isActive, onPress, tabWidths, scrollX}, tabRef) => {
    return (
      <View ref={tabRef} style={{padding: 4}}>
        <View>
          <MotiView
            animate={{
              backgroundColor: isActive ? 'rgba(0,0,0,0)' : '#fff',
              opacity: isActive ? 0 : 1,
            }}>
            <TransparentText
              style={{
                fontSize: 20,
                fontWeight: '600',
              }}>
              {item?.name}
            </TransparentText>
          </MotiView>
        </View>
      </View>
    );
  },
);

const Indicator = ({tabWidths, scrollX}) => {
  console.log(tabWidths);
  const inputRange = tabWidths.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: tabWidths.map(data => data.width / 2),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: tabWidths.map(data => data.x),
  });
  console.log(translateX, indicatorWidth);
  return (
    <Animated.View
      style={{
        height: 3,
        width: indicatorWidth,
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft: 2,
        transform: [{translateX}],
      }}>
      <GradientView />
    </Animated.View>
  );
};
