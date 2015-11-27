/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("AddPersonToEvent", AddPersonToEvent);

    function AddPersonToEvent($scope,$http, EventsService, $routeParams){

        var guest = $scope.guest = {};
        guest.name = "";
        guest.contribution = "";
        guest.comment = "";
        guest.canceled = false;

        $scope.saveNewGuest = function ( guest ){
            console.log(guest)
            EventsService.saveNewGuest(guest, $routeParams.eventId, function (data){
                console.log("result of saved guest", data);
            });
        };

    }


    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams"];



});