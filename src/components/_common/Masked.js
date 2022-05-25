import React from 'react';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {GradientView} from './Gradient';
export const MaskedText = ({children, text, textStyle}) => {
  //   console.log(text, children);
  return (
    <MaskedView
      style={{flex: 1, zIndex: 5}}
      maskElement={
        <Text style={[textStyle, {fontSize: 18, fontWeight: '600'}]}>
          {text}
        </Text>
      }>
      {children}
    </MaskedView>
  );
};

export const MaskedIcon = ({children, iconStyle}) => {
  return (
    <MaskedView
      maskElement={
        <View style={[iconStyle, {flex: 1, width: '100%', height: '100%'}]}>
          {children}
        </View>
      }>
      <GradientView />
    </MaskedView>
  );
};
