import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

export const GradientView = props => {
  return (
    <LinearGradient
      locations={[0, 1]}
      colors={['#FF5F6D', '#FFC371']}
      style={{flex: 1, width: '100%', borderRadius: 6}}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}>
      {props.children}
    </LinearGradient>
  );
};
export const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        locations={[0, 1]}
        colors={['#FF5F6D', '#FFC371']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};
export const TransparentText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <View>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </View>
    </MaskedView>
  );
};
export const GradientMaskView = props => {
  return (
    <MaskedView maskElement={<View {...props} />}>
      <LinearGradient
        locations={[0, 1]}
        colors={['#FF5F6D', '#FFC371']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <View {...props} style={[{opacity: 0}, props.style]}></View>
      </LinearGradient>
    </MaskedView>
  );
};
export const TestTextMaskView = props => {
  return (
    <MaskedView
      style={{flex: 1, flexDirection: 'row', height: '100%'}}
      maskElement={
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 60,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Hello
          </Text>
        </View>
      }>
      <LinearGradient
        locations={[0, 1]}
        colors={['#FF5F6D', '#FFC371']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
      />
    </MaskedView>
  );
};

// export default GradientText;
