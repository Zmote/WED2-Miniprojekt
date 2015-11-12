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
        'app': '../classes',
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

require(['frameworks/angular',
    'app/modules/lafete',
    'libraries/angularRoute'
], function (Angular, Lafete, route) {
    Angular.element(document).ready(function() {
        Angular.bootstrap(document, [Lafete.name]);
    });

    Lafete.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/events.html',
                controller: 'EventController'


            }).
            otherwise({redirectTo:'/events'})


        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });



});