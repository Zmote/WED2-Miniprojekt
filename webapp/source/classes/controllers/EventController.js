define(['lafete'], function (lafete) {



         var EventController = function($scope, $http, EventsService) {

            $http.get("/api/events").then(function (data) {
                console.log("events", data.data.events);

                $scope.events = data.data.events;
            })


         }
         lafete.controller("EventController",EventController);

         EventController.$inject = ["$scope", "$http", "EventsService"];

         return EventController;
});