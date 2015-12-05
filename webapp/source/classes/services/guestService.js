/**
 * Created by Dogan on 23.11.15.
 */
define(['lafete'], function (lafete) {


        var GuestService = function($http){

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
        };

        lafete.factory("GuestService", GuestService);
        GuestService.$inject = ["$http"];
        return GuestService;
});