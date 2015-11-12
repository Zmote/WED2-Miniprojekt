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

require(['frameworks/angular', 'app/modules/lafete', 'libraries/angularRoute'], function (Angular, Lafete, route) {
    Angular.element(document).ready(function() {
        Angular.bootstrap(document, [Lafete.name]);
    });

    Lafete.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/events', {
                templateUrl: '../../events.html',
                controller: 'EventsController'


            })
            .when('/Book/:bookId/ch/:chapterId', {
                templateUrl: 'chapter.html',
                controller: 'ChapterController'
            });

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });

});