import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

export const GradientView = props => {
  return (
    <LinearGradient
      locations={[0, 0.25, 0.5, 1]}
      colors={['#667EEA', '#658DF0', '#659BF5', '#64B6FF']}
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
        locations={[0, 0.25, 0.5, 1]}
        colors={['#667EEA', '#658DF0', '#659BF5', '#64B6FF']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};
export const GradientMaskView = props => {
  return (
    <MaskedView maskElement={<View {...props} />}>
      <LinearGradient
        locations={[0, 0.25, 0.5, 1]}
        colors={['#667EEA', '#658DF0', '#659BF5', '#64B6FF']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <View {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

// export default GradientText;
