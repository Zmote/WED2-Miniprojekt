define([], function () {
     angular
         .module("lafete")
         .controller("EventController",["$scope", "$http", function($scope, $http){

            $http.get("/api/events").then(function(data){
                $scope.events = data.data.events;
            })
         }])
});