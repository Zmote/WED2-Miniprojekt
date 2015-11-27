/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("EventDetail", EventDetail);

    function EventDetail($scope,$http, EventsService, $routeParams){
        $scope.hop = "Cemil Dogan";
        var eventId = $routeParams.id;
        EventsService.getEventById (eventId, function (data){
            $scope.selectedEvent = data;
        });


    }


    EventDetail.$inject =  ["$scope", "$http", "EventsService","$routeParams"];



});