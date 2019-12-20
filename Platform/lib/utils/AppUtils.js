import { AsyncStorage } from 'react-native';

/**
 * setAppEnvironment
 * This method sets application environment
 *
 */
export const saveDataInStorage = (dataInfo, dataKey) => {
  AsyncStorage.setItem(`${dataKey}`, JSON.stringify(dataInfo));
};

/**
 * setAppEnvironment
 * This method sets application environment
 *
 */
export const getDataFromStorage = (dataKey, onSuccess, onFail) => {
  AsyncStorage.getItem(`${dataKey}`, (err, result) => {
    if (result) {
      onSuccess(JSON.parse(result));
    } else {
      onFail(err);
    }
  });
};
