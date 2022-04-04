import React from 'react';
import {Discover} from '../components/landing';
import PageWrapper from '../components/_common/PageWraper';

/**
 */
export function Screen_Discover(props) {
  return (
    <PageWrapper navigation={props.navigation}>
      <Discover navigation={props.navigation} />
    </PageWrapper>
  );
} // Screen_Home
