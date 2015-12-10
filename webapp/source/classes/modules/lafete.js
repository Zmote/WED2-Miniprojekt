/**
 * Created by Dogan on 12.11.15.
 */
define(['angular','ngRoute','angular-animate','angular-toast' ,'moment',
        'EventsService','GuestService','EventDetail','AddPersonToEvent',
        'AddEventController','EventGuestsController','EventController'],
    function (angular ,ngRoute , Animate, Toaster,moment,EventsService,
            GuestService,EventDetail,AddPersonToEvent,AddEventController,
            EventGuestsController,EventController) {


    var Lafete = angular.module('lafete', ["ngRoute" ,"ngAnimate","toaster"]);

    Lafete.factory("GuestService", GuestService);
    GuestService.$inject = ["$http"];

    Lafete.factory("EventsService", EventsService );
    EventsService.$inject = ["$http"];

    Lafete.controller("EventGuestsController", EventGuestsController);
    EventGuestsController.$inject =  ["$scope", "$http","$routeParams", "EventsService"];

    Lafete.controller("EventDetail", EventDetail);
    EventDetail.$inject =  ["$scope", "$http", "EventsService","$routeParams","GuestService","$location","$filter","toaster"];

    Lafete.controller("EventController",EventController);
    EventController.$inject = ["$scope", "$http", "EventsService"];

    Lafete.controller("AddPersonToEvent", AddPersonToEvent);
    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster","$location"];

    Lafete.controller("AddEventController", AddEventController);
    AddEventController.$inject =  ["$scope", "$http", "EventsService","toaster","$location"];

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
            otherwise({redirectTo:'/events'})


    });

    return Lafete;
});