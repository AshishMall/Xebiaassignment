import CallAPI from '../../utils/CallAPI';

export const callapi = (url, onSucess, onFail) => (dispatch) => {
  const config = {
    url,
    method: 'GET',
  };
  CallAPI(config, true, dispatch, true, {}, onSucess, onFail);
};
