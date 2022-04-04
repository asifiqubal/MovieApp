import {StatusBar, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ui from '../../_config/ui';

const PageWraper = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ui.color.background}}>
      <StatusBar
        backgroundColor={ui.color.status_bar_black}
        barStyle="light-content"
      />
      <View style={{flex: 1}}>{props.children}</View>
    </SafeAreaView>
  );
};

export default PageWraper;
