/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    return angular
            .module("lafete")
            .factory("EventsService", function($http){

                return {
                    saveNewEvent: function (event, call) {
                        $http.post("/api/events", event).then(function (data) {
                            call(data);
                        });
                    },
                    getEventById : function(id, call){
                        $http.get("/api/events/"+id).then(function (data) {
                            call(data);
                        });
                    }
                }




        });
});