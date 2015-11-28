/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("AddPersonToEvent", AddPersonToEvent);

    function AddPersonToEvent($scope,$http, EventsService, $routeParams, toaster){
        //tmp variable for message status div
        $scope.messageStatus = false;
        var guest = $scope.guest = {};
        guest.name = "";
        guest.contribution = "";
        guest.comment = "";
        guest.canceled = false;

        $scope.saveNewGuest = function ( guest ){
            console.log(guest)
            EventsService.saveNewGuest(guest, $routeParams.eventId, function (data){
                $scope.guest = {};
                toaster.pop('error',"title", "text");
                console.log("result of saved guest", data);
                $scope.messageStatus = true;
                setTimeout(function(){
                    $scope.messageStatus = false;
                    $scope.$apply();
                },2000)
            });
        };

    }

    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster"];



});