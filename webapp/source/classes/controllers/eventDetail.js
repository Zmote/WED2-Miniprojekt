/**
 * Created by Dogan on 23.11.15.
 */
define(['moment'], function (moment) {

    angular
        .module("lafete")
        .controller("EventDetail", EventDetail);

    function EventDetail($scope,$http, EventsService, $routeParams,GuestService, $location,$filter){

        $scope.init = function (){
            var eventId = $routeParams.id;
            $scope.getEventDetails(eventId);
        }

        $scope.getEventDetails = function(eventId){
            EventsService.getEventById (eventId, function (data){
                $scope.selectedEvent = data.data;
                $scope.selectedEvent.isEditable = true;
                $scope.$watch('selectedEvent.times.begin', function (newValue) {
                    $scope.selectedEvent.times.begin = $filter('date')(newValue, 'dd/MM/yyyy');
                });
                $scope.$watch('selectedEvent.times.end', function (newValue) {
                    $scope.selectedEvent.times.end = $filter('date')(newValue, 'dd/MM/yyyy');
                });
            });

        }


        $scope.changeEditableStatus =  function ( guest ){
            guest.isEditable = !guest.isEditable ;

        }

        $scope.deleteGuest = function (guest ,event){
            //console.log("from delete guest", guest);
            guest.canceled = true;
            GuestService.updateGuest (guest ,event._id, function (data){

                $scope.changeEditableStatus(guest);
                $scope.getEventDetails(event._id);
            });
            $scope.changeEditableStatus(guest);
        }

        $scope.updateGuest = function (guest , event){
            //console.log("from delete event", event);
            GuestService.updateGuest (guest ,event._id, function (data){

                $scope.changeEditableStatus(guest);
                $scope.getEventDetails(event._id);
            });

        }

        $scope.updateEvent = function (event){
            event.times.begin = new Date(moment(event.times.begin,"MM/DD/YYYY")).getTime();
            event.times.end = new Date(moment(event.times.end,"MM/DD/YYYY")).getTime();
            EventsService.updateEvent(event, function (data){
                $scope.getEventDetails(event._id);
            });
        }

        $scope.deleteEvent = function (event){

            EventsService.deleteEvent(event, function (data){
                $location.path("#/events");
            });
        }

        $scope.init();
    }


    EventDetail.$inject =  ["$scope", "$http", "EventsService","$routeParams","GuestService","$location","$filter"];



});