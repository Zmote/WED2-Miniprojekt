/**
 * Created by Dogan on 12.11.15.
 */
// classes/main.js

require.config({
    // base url relative to the index.html
    baseUrl:'../source',
    paths: {

        'angular': './frameworks/angular/angular.min',
        'ngRoute': './libraries/angular-route/angular-route',
        'EventsService':'./classes/services/eventService',
        'GuestService':'./classes/services/guestService',
        'EventDetail':'./classes/controllers/eventDetail',
        'AddPersonToEvent':'./classes/controllers/AddPersonToEvent',
        'AddEventController':'./classes/controllers/AddEventController',
        'EventGuestsController':'./classes/controllers/EventGuestsController',
        'EventController':'./classes/controllers/EventController',
        'angular-toast': './libraries/AngularJS-Toaster/toaster',
        'angular-animate' : './libraries/angular-animate/angular-animate',
        'moment' : './libraries/moment/moment',
        'lafete' : './classes/modules/lafete'

    },
    // angular does not support async loading out of the box -> use the shim loader
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ngRoute': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-toast': {
            deps: ['angular','angular-animate']

        }
    }
});

/*  Start the application */
require(['angular','lafete'],function(Angular,Lafete){
    Angular.bootstrap(document, ['lafete']);

});
