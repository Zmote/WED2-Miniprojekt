/**
 * Created by Dogan on 12.11.15.
 */
define(['angular','ngRoute','angular-animate','angular-toast' ,'moment',
    'app/controllers/AddEventController','app/controllers/AddPersonToEvent',
    'app/controllers/EventController', 'app/controllers/eventDetail',
    'app/controllers/EventGuestsController','app/services/eventService','app/services/guestService'],
    function (Angular ,ngRoute , Animate, Toaster,moment,AddEventController,AddPersonToEvent,
                EventController,EventDetail,EventGuestsController,EventsService,GuestService) {

    //['angular','ngRoute','angular-animate','angular-toast' ,'moment' ]
    var Lafete = Angular.module('lafete', ["ngRoute" ,"ngAnimate","toaster"]);

    Lafete.controller('AddEventController',AddEventController);
    Lafete.controller('AddPersonToEvent',AddPersonToEvent);
    Lafete.controller('EventController',EventController);
    Lafete.controller('EventDetail',EventDetail);
    Lafete.controller('EventGuestsController',EventGuestsController);

    Lafete.service('EventsService',EventsService);
    Lafete.service('GuestService',GuestService);

    EventGuestsController.$inject =  ["$scope", "$http","$routeParams", "EventsService"];
    AddEventController.$inject =  ["$scope", "$http", "EventsService","toaster","$location"];
    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster","$location"];
    EventDetail.$inject =  ["$scope", "$http", "EventsService","$routeParams","GuestService","$location","$filter","toaster"];
    EventController.$inject = ["$scope", "$http"];

    Lafete.config(function($routeProvider) {
        $routeProvider
            .when('/events', {
                templateUrl: './views/events.html',
                controller: 'EventController'


            })
            .when('/addEvents', {
                templateUrl: './views/addEvent.html',
                controller: 'AddEventController'


            })
            .when('/eventGuests/:id', {
                templateUrl: './views/eventGuests.html',
                controller: 'EventGuestsController'


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
            otherwise({redirectTo:'/events'});

        //$locationProvider.html5Mode(true);
        // /event/{{selectedEvent.data.id}}/person
    });

});