/**
 * Created by Dogan on 23.11.15.
 */
define(['moment'], function (moment) {

    angular
        .module("lafete")
        .controller("EventDetail", EventDetail);

    function EventDetail($scope,$http, EventsService, $routeParams,GuestService, $location,$filter,toaster){

        $scope.init = function (){
            var eventId = $routeParams.id;
            $scope.getEventDetails(eventId);
        };



        $scope.getEventDetails = function(eventId){
            EventsService.getEventById (eventId, function (data){
                $scope.selectedEvent = data.data;
                $scope.registeredUsers = [];
                $scope.selectedEvent.isEditable = true;
                $scope.checkRegisteredUsers($scope.selectedEvent);
                $scope.$watch('selectedEvent.times.begin', function (newValue) {
                    $scope.selectedEvent.times.begin = $filter('date')(newValue, 'dd/MM/yyyy');
                });
                $scope.$watch('selectedEvent.times.end', function (newValue) {
                    $scope.selectedEvent.times.end = $filter('date')(newValue, 'dd/MM/yyyy');
                });
            });

        };

        $scope.checkRegisteredUsers = function(event){
            console.log(event);
            for(var i = 0;i < event.guests.length;i++){
                if(!event.guests[i].canceled){
                    $scope.registeredUsers.push(event.guests[i]);
                }
            }
        };

        $scope.changeEditableStatus =  function ( guest ){
            guest.isEditable = !guest.isEditable ;

        };

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

        $scope.addGuest = function(event){
            if($scope.registeredUsers.length >= event.maximalAmountOfGuests){
                toaster.pop("error", "Max. amount of guests reached!");
                return;
            }
          $location.path("/event/"+ event._id+ "/person");
        };

        $scope.updateEvent = function (event){
            if(new Date(moment(event.times.begin,"MM/DD/YYYY")).getTime() > new Date(moment(event.times.end,"MM/DD/YYYY")).getTime()){
                toaster.pop("error","End time can't be before Begin Time");
                return;
            }
            var zafer = angular.copy(event);
            zafer.times.begin = new Date(moment(event.times.begin,"MM/DD/YYYY")).getTime();
            zafer.times.end=new Date(moment(event.times.end,"MM/DD/YYYY")).getTime();

            EventsService.updateEvent(zafer, function (data){
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


    EventDetail.$inject =  ["$scope", "$http", "EventsService","$routeParams","GuestService","$location","$filter","toaster"];



});