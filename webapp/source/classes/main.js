/**
 * Created by Dogan on 12.11.15.
 */
// classes/main.js

require.config({
    // base url relative to the index.html
    baseUrl:'./',
    paths: {

        'angular': '../frameworks/angular/angular.min',
        'ngRoute': '../libraries/angular-route/angular-route',
        'app': '../classes',
        'event-service' : '../classes/services/eventService'

    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ngRoute': {
            deps: ['angular']

        }
    }
});

/*ne picim bir insansin*/

/*  Start the application */
require(['app/modules/lafete']);