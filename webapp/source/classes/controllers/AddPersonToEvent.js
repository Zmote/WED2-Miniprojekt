/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("AddPersonToEvent", AddPersonToEvent);


    function AddPersonToEvent($scope,$http, EventsService, $routeParams, toaster,$location){

        var guest = $scope.guest = {};
        guest.name = "";
        guest.contribution = "";
        guest.comment = "";
        guest.canceled = false;

        $scope.saveNewGuest = function ( guest ){

            EventsService.saveNewGuest(guest, $routeParams.eventId, function (data){

                if(data.status == 200){
                    $scope.guest = {};
                    toaster.pop('success', "Succesfully added new Guest!");
                    $location.path("/eventDetail/"+ $routeParams.eventId);

                }else{
                    toaster.pop('error',"Couldn't add new Guest!");
                    console.log("Error: ", data.status + " " + data.statusText);
                }

            });
        };

    }

    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster","$location"];



});