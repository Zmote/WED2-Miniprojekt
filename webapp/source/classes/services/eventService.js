/*
 * Created by Dogan on 23.11.15.
 */
define(['lafete'], function (lafete) {



        var EventsService = function($http){

            return {
                getAllEvents: function (call){
                    $http.get("/api/events", function (data){
                        call(data);
                    })
                }
                ,
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
                        console.log(data);
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

        };

        lafete.factory("EventsService", EventsService );
        EventsService.$inject = ["$http"];

        return EventsService;



});
