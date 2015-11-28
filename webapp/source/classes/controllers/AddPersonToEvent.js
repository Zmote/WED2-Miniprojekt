/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("AddPersonToEvent", AddPersonToEvent);

    function AddPersonToEvent($scope,$http, EventsService, $routeParams, toaster){
        var guest = $scope.guest = {};
        guest.name = "";
        guest.contribution = "";
        guest.comment = "";
        guest.canceled = false;

        $scope.saveNewGuest = function ( guest ){
            console.log(guest)
            EventsService.saveNewGuest(guest, $routeParams.eventId, function (data){
                if(data.status == 200){
                    $scope.guest = {};
                    toaster.pop('success', "Succesfully added new Guest!");
                    console.log("result of saved guest", data);
                }else{
                    toaster.pop('error',"Couldn't add new Guest!");
                    console.log("Error: ", data.status + " " + data.statusText);
                }
            });
        };

    }

    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster"];



});