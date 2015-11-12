define([], function () {
     var EventController = function ($scope,$http){
             $http.get("/api/events").then(function(data){
                 this.scope = $scope;
                 this.scope.events = data.data.events;
             })
     };
    return EventController;
});