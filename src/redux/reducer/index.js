import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Genre from './Genre';
import Discover from './Discover';
/**
 */
const rdx_reduers = combineReducers({
  __genre: Genre,
  __discover: Discover,
});

/**
 */
const persist_cfg = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

/**
 */
export default persistReducer(persist_cfg, rdx_reduers);
