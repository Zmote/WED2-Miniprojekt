define(['lafete'], function (lafete) {

         var EventController = function($scope, $http, EventsService) {

             $scope.init = function(){
                 EventsService.getAllEvents(function (data){
                     //console.log("events", data.data.events);
                     $scope.events = data.data.events;
                     //console.log("I am scope.events", $scope.events);
                 });
             };

             $scope.init();
         };

         EventController.$inject = ["$scope", "$http", "EventsService"];

         lafete.controller("EventController",EventController);

         return EventController;
});