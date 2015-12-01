/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    var EventsService = function($http){
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
            },
            saveNewGuest: function (guest,eventID, call) {
                $http.post("/api/events/"+ eventID+"/guests", guest).then(function (data) {
                    call(data);
                });
            },
            updateEvent : function (event, call){
                $http.post("/api/events/"+event._id , event).then(function (data) {
                    call(data);
                });

            },
            deleteEvent : function (event, call){

                $http.post('/api/events/delete/'+event._id ).then(function (data) {
                    call(data);
                });
            }
        }
    }

    return EventsService;

});