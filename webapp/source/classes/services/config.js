
/**
 * Created by Dogan on 12.11.15.
 */
define([], function () {

    angular.module("lafete")
    .config(function($routeProvider) {
        $routeProvider
            .when('/events', {
                templateUrl: './views/events.html',
                controller: 'EventController'


            })
            .when('/addEvents', {
                templateUrl: './views/addEvent.html',
                controller: 'AddEventController'


            }).
            otherwise({redirectTo:'/events'})



        //$locationProvider.html5Mode(true);
    });




});