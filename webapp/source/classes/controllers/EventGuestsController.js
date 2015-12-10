define([], function () {




         function EventGuestsController($scope,$http,$routeParams, EventsService){

             $scope.init = function (){
                 var eventId = $routeParams.id;
                 $scope.getEventDetails(eventId);
             };

             $scope.getEventDetails = function(eventId){
                 EventsService.getEventById (eventId, function (data){
                     $scope.selectedEvent = data.data;
                     //console.log("selected event", data.data);
                 });
             };

             $scope.init();




         }

    return EventGuestsController;
});