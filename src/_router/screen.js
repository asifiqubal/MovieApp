import React from 'react';
import {Discover} from '../components/landing';
import MovieDetails from '../components/landing/MovieDetails';
import PageWrapper from '../components/_common/PageWraper';

/**
 */
export function Screen_Discover(props) {
  return (
    <PageWrapper navigation={props.navigation}>
      <Discover navigation={props.navigation} {...props} />
    </PageWrapper>
  );
} // Screen_Home
/**
 */
export function Screen_Details(props) {
  return (
    <PageWrapper navigation={props.navigation}>
      <MovieDetails navigation={props.navigation} {...props} />
    </PageWrapper>
  );
} // Screen_Home
