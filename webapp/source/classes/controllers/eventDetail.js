/**
 * Created by Dogan on 23.11.15.
 */
define(['lafete'], function (lafete) {



    var EventDetail = function($scope,$http, EventsService, $routeParams,GuestService, $location){


        $scope.init = function (){
            var eventId = $routeParams.id;
            $scope.getEventDetails(eventId);
        }

        $scope.getEventDetails = function(eventId){
            EventsService.getEventById (eventId, function (data){
                $scope.selectedEvent = data.data;
                $scope.selectedEvent.isEditable = true;
            });
        }


        $scope.changeEditableStatus =  function ( guest ){

            guest.isEditable = !guest.isEditable ;

        }

        $scope.deleteGuest = function (guest ,event){
            //console.log("from delete guest", guest);
            guest.canceled = true;
            GuestService.updateGuest (guest ,event.id, function (data){

                $scope.changeEditableStatus(guest);
                $scope.getEventDetails(event.id);
            });
            $scope.changeEditableStatus(guest);
        }

        $scope.updateGuest = function (guest , event){
            //console.log("from delete event", event);

            GuestService.updateGuest (guest ,event.id, function (data){

                $scope.changeEditableStatus(guest);
                $scope.getEventDetails(event.id);
            });

        }

        $scope.updateEvent = function (event){
            EventsService.updateEvent(event, function (data){
                $scope.getEventDetails(event.id);
            });
        }

        $scope.deleteEvent = function (event){

            EventsService.deleteEvent(event, function (data){
                $location.path("#/events");
            });
        }

        $scope.init();
    }

    lafete.controller("EventDetail", EventDetail);

    EventDetail.$inject =  ["$scope", "$http", "EventsService","$routeParams","GuestService","$location"];

    return EventDetail;

});