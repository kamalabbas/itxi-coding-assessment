// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  client_id: "00f633de4c534805b5661544a994d97d",
  client_secret: "a80a964d08344cdf99a1c9f42f473139",
  spotify_api: "https://api.spotify.com/v1",
  spotify_redirect_uri:"http://localhost:4200/login",
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
