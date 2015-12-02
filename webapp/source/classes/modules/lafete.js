/**
 * Created by Dogan on 12.11.15.
 */
define(['angular','ngRoute','angular-animate','angular-toast' ,'moment' ], function (angular ,ngRoute , Animate, Toaster,moment) {


    var Lafete = angular.module('lafete', ["ngRoute" ,"ngAnimate","toaster"]);



    angular.element(document).ready(function() {

        require(["classes/controllers/controllerReferences"], function (references){
            require(references, function(){
                angular.bootstrap(document, [Lafete.name]);
            });

        })

    });


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