import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import Reducer from '../redux/Reducer';

/* create store for platform app
*/
const store = createStore(
  Reducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, promiseMiddleware()),
  ),
);

/* create store style for platform app
*/
const storeStyle = {
  viewStyle: {
    flex: 1,
  },
};

/* export store and store style
*/
export { store, storeStyle };
