import { AuthProviders, AuthMethods, FirebaseAppConfig  } from 'angularfire2';

export const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: 'AIzaSyDrKm3viYytMep7eqkMtystaiBPlJG6UJQ',
    authDomain: 'githyde-1cb57.firebaseapp.com',
    databaseURL: 'https://githyde-1cb57.firebaseio.com/'
};
export const firebaseAuthConfig = {
    provider: AuthProviders.Github,
    method: AuthMethods.Redirect,
    scope: ['repo']
};
