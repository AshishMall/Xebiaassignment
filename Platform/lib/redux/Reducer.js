import { combineReducers } from 'redux';
import CommodityList from '../containers/Login/loginReducer';


/* export all reducers after combining them with combinneReducer
*/
const rootReducer = combineReducers({
  CommodityList,
});


export default (state, action = {}) => {
  let appstate = state;
  if (action.type === `${API_STAGE.REJECTED}`
  || action.type === `${API_STAGE.FULFILLED}`) {
    // API stage fulfilled
    const { payload = {} } = action;
    const { data = {} } = payload;
     if (data === null  {
      appstate = undefined;
    }
  }

  return rootReducer(appstate, action);
};
