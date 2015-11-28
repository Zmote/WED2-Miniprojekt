
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


            })
            .when('/eventDetail/:id', {
                templateUrl: './views/eventDetail.html',
                controller: 'EventDetail',
                resolve: {
                    // I will cause a 1 second delay
                    delay: function($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 100);
                        return delay.promise;
                    }
                }


            })
            .when('/event/:eventId/person', {
                templateUrl: './views/addPerson.html',
                controller: 'AddPersonToEvent'


            }).
            otherwise({redirectTo:'/events'})



        //$locationProvider.html5Mode(true);
        // /event/{{selectedEvent.data.id}}/person
    });
});