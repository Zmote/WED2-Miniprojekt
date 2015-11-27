/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    angular
        .module("lafete")
        .controller("AddPersonToEvent", AddPersonToEvent);

    function AddPersonToEvent($scope,$http, EventsService, $routeParams){



    }


    AddPersonToEvent.$inject =  ["$scope", "$http", "EventsService","$routeParams"];



});