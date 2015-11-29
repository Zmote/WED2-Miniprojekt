define([], function () {
     angular
         .module("lafete")
         .controller("EventController",["$scope", "$http", function($scope, $http){
            $http.get("/api/events").then(function(data){
                console.log("Im here");
                console.log(data);
                $scope.events = data.data.events;
            })
         }])
});