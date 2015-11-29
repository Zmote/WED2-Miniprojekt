define([], function () {
     angular
         .module("lafete")
         .controller("EventController",["$scope", "$http", function($scope, $http){
            $http.get("/api/events").then(function(data){

                console.log("events", data.data.events);

                $scope.events = data.data.events;
            })
         }])
});