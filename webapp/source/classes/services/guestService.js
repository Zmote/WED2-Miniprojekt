/**
 * Created by Dogan on 23.11.15.
 */
define([], function () {

    return angular
            .module("lafete")
            .factory("GuestService", function($http){

                return {

                    saveNewGuest: function (guest,eventID, call) {
                        $http.post("/api/events/"+ eventID+"/guests", guest).then(function (data) {
                            call(data);
                        });
                    },
                    updateGuest : function (guest ,eventID,  call){
                        $http.post('/api/events/'+eventID+'/guests/'+guest.id, guest).then(function (data) {
                            call(data);
                        });
                    }
                }




        });
});