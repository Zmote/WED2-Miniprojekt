define([], function () {

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

         return EventController;
});