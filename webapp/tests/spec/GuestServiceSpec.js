/**
 * Created by Zmotions on 05.12.2015.
 */

define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "EventsService",
        "GuestService",
        "angularResource",
        "AddEventController"
    ] ,
    function () {

        describe('Event service test cases', function() {
            var GuestService, $httpBackend,$http,guest;
            beforeEach(module("lafete"));
            beforeEach(inject(function($injector){
                $http = $injector.get("$http");
                $httpBackend = $injector.get("$httpBackend");
                var $controller = $injector.get("$controller");
                GuestService = $injector.get("GuestService");
                guest = {name:"Zafer",comment:"Awesomeness is in the air",contribution:"What what", canceled:"false",id:1};
            }));

            it("should call $http.post on GuestService.saveNewGuest",function(){
                $httpBackend.whenPOST("/api/events/1/guests").respond(200,guest);
                spyOn($http,"post").and.callThrough();
                var result;
                GuestService.saveNewGuest(guest,1,function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.post).toHaveBeenCalled();
                expect($http.post).toHaveBeenCalledWith("/api/events/1/guests",guest);
            });

            it("should call $http.post on GuestService.updateGuest",function(){
                $httpBackend.whenPOST("/api/events/1/guests/1").respond(200,guest);
                spyOn($http,"post").and.callThrough();
                var result;
                GuestService.updateGuest(guest,1,function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.post).toHaveBeenCalled();
                expect($http.post).toHaveBeenCalledWith("/api/events/1/guests/1",guest);
            });

        });


    });
