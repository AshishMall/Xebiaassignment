import * as AppUtils from '../AppUtils';
import { AppEnvironment } from '../../constants/AppConstants';

describe('AppUtils testcases', () => {

  it('should return base url and environment', () => {
    const { DEV_ENV, QA_ENV, PROD_ENV } = AppEnvironment;
    AppUtils.setAppEnvironment(DEV_ENV);
    expect(AppUtils.getApiBaseUrl()).toEqual('https://api-dev.dev.dev-cglcloud.com/api/dxo/cascna');
    AppUtils.setAppEnvironment(QA_ENV);
    expect(AppUtils.getApiBaseUrl()).toEqual('https://api-stage.stage.cglcloud.in/api/dxo/cascna');
    AppUtils.setAppEnvironment(PROD_ENV);
    expect(AppUtils.getApiBaseUrl()).toEqual('https://api.cglcloud.com/api/dxo/cascna');
    const environment = AppUtils.getAppEnvironment();
    expect(environment).toEqual(PROD_ENV);

  });

  it('should return authrization token', () => {
    expect(AppUtils.getAuthorizationToken()).toEqual('Bearer null');
  });

  it('should set authrization token', () => {
    AppUtils.setAuthorizationToken('test token');
    expect(AppUtils.getAuthorizationToken()).toEqual('Bearer test token');
    AppUtils.setAuthorizationToken();
    expect(AppUtils.getAuthorizationToken()).toEqual('Bearer undefined');
  });

});