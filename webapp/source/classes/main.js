/**
 * Created by Dogan on 12.11.15.
 */
// classes/main.js

require.config({
    // base url relative to the index.html
    baseUrl:'./',
    paths: {
        'frameworks/angular': '../frameworks/angular/angular.min',
        'libraries/angularRoute': '../libraries/angular-route/angular-route',
        'app': '../classes'
    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'frameworks/angular': {
            exports: 'angular'
        },
        'libraries/angularRoute': {
            deps: ['frameworks/angular'],

        }
    }
});

/*  Start the application */
require(['app/modules/lafete']);