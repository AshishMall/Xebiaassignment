import axios from 'axios';
import { HTTPStatusCode } from '../constants/AppConstants';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import { API_STAGE } from '../constants/ReduxConstants';

/**
 * CallAPI
 * This method calls API with required input configuration
 *
 * @param {*} [requireConfig={}]
 * @returns
 */
const CallAPI = (requireConfig = {},
  dispatch,
  type,
  retry = false,
  metaData = {},
  onSucess,
  onfail) => {
  let { url } = requireConfig;
 
  // set config for request
  const { params = {} } = requireConfig;
  const config = {
    ...requireConfig,
    url,
    params: { ...params,  },
    timeout: 60000,
  };

  /**
   * 1. Setting store with pending state
   * 2. If able to recevie a valid response then setting stroe with fullfilled message
   * 3. If we are receving an error from server then updating stroe with rejected state
   * 4. In rejected case, we are calling refresh token api
   */
  /**
   * 1. Setting store with pending state
   */
  if (dispatch) {
    dispatch({
      type: `${type}${API_STAGE.PENDING}`,
      meta: metaData,
    });
  }
  const request = axios(config)
    .then((response) => {
    /**
     * 2. If able to recevie a valid response then setting stroe with fullfilled message
     */
      if (dispatch) {
        dispatch({
          type: `${type}${API_STAGE.FULFILLED}`,
          payload: { data: response.data },
          meta: metaData,
        });
      }
      if (onSucess && onSucess !== undefined) {
        onSucess(response);
      }
    })
    .catch((error) => {
    /**
     * 3. If we are receving an error from server then updating stroe with rejected state
     */
      const { response = {} } = error;
      if (dispatch) {
        dispatch({
          type: `${type}${API_STAGE.REJECTED}`,
          payload: { response },
          meta: metaData,
        });
      }
      const errorResponse = response;
      /**
       * 3. If error code is 401 then we are hitting refresh token api
       */
      if (errorResponse && retry) {
        const {
          status,
          data = {},
        } = errorResponse;
        const { message } = data;
        if (status === HTTPStatusCode.UNAUTHORIZED
          && message === STRING_CONSTANTS.UNAUTHORIZED) {
          authenticateAPI(
            { config: requireConfig, type },
            dispatch,
            metaData,
            onSucess,
            onfail,
          );
        } else if (onfail && onfail !== undefined) {
          onfail(error);
        }
      } else if (onfail && onfail !== undefined) {
        onfail(error);
      }
    });
  return request;
};

// export method for call api
export default CallAPI;
