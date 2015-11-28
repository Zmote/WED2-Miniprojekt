/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("AddPersonToEvent", AddPersonToEvent);

<<<<<<< HEAD
    function AddPersonToEvent($scope,$http, EventsService, $routeParams, toaster, $location ){
        //tmp variable for message status div
        $scope.messageStatus = false;
=======
    function AddPersonToEvent($scope,$http, EventsService, $routeParams, toaster){
>>>>>>> master
        var guest = $scope.guest = {};
        guest.name = "";
        guest.contribution = "";
        guest.comment = "";
        guest.canceled = false;

        $scope.saveNewGuest = function ( guest ){
            console.log(guest)
            EventsService.saveNewGuest(guest, $routeParams.eventId, function (data){
<<<<<<< HEAD
                $scope.guest = {};
                console.log("save new guest",data);
                $location.path("/eventDetail/"+ $routeParams.eventId);
                toaster.pop('success',"title", "New guest is saved.");


=======
                if(data.status == 200){
                    $scope.guest = {};
                    toaster.pop('success', "Succesfully added new Guest!");
                    console.log("result of saved guest", data);
                }else{
                    toaster.pop('error',"Couldn't add new Guest!");
                    console.log("Error: ", data.status + " " + data.statusText);
                }
>>>>>>> master
            });
        };

    }

    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster","$location"];



});