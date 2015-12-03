/**
 * Created by Dogan on 23.11.15.
 */
define(['lafete'], function (lafete) {




    var AddPersonToEvent = function($scope,$http, EventsService, $routeParams, toaster,$location){

        var guest = $scope.guest = {};
        guest.name = "";
        guest.contribution = "";
        guest.comment = "";
        guest.canceled = false;

        $scope.checkResponse = function (data){
            if(data.status == 200){
                $scope.guest = {};
                $scope.savedGuest = data;
                toaster.pop('success', "Succesfully added new Guest!");
                $location.path("/eventDetail/"+ $routeParams.eventId);

            }else{
                toaster.pop('error',"Couldn't add new Guest!");
                console.log("Error: ", data.status + " " + data.statusText);
            }

        };

        $scope.saveNewGuest = function ( guest ){
            EventsService.saveNewGuest(guest, $routeParams.eventId,$scope.checkResponse);
        };

    };

    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams","toaster","$location"];

    lafete.controller("AddPersonToEvent", AddPersonToEvent);

    return AddPersonToEvent;
});