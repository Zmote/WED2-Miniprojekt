
/**
 * Created by Dogan on 12.11.15.
 */
define([], function () {

     var EventController = function ($scope,$http){



             $http.get("/api/events").then(function(data){
                 $scope.events = data;
             })





     }

    return EventController;


});