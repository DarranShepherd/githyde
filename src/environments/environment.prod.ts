import { firebaseAppConfig, firebaseAuthConfig } from './firebase';

firebaseAppConfig.databaseURL = 'githyde.io';

export const environment = {
  production: true,
  firebaseAppConfig: firebaseAppConfig,
  firebaseAuthConfig: firebaseAuthConfig
};
