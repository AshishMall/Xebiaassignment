import {  API_STAGE  } from '../../constants/ReduxConstants';

const DEFAULT_STATE = {
  data: [],
  isFetching: false,
  error: null,
};

/**
 *
 * This method is a reducer function 
 *
 */
export default (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    // API stage pending
    case `${API_STAGE.PENDING}`:
      return {
        ...DEFAULT_STATE,
        isFetching: true,
      };
    case `${API_STAGE.FULFILLED}`: {
      // API stage fulfilled
      const { data } = action.payload.data;
      return {
        ...state,
        ...data,
        isFetching: false,
        error: null,
      };
    }
    case `${API_STAGE.REJECTED}`: {
      // API stage rejected
      const { status } = action.payload.response;
      return {
        ...DEFAULT_STATE,
        error: { statusCode: status },
      };
    }
    default:
      return state;
  }
};
