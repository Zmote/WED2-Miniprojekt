
define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "ControllerReferences",
        "EventsService",
        "angularResource",
        "AddEventController",

    ] ,
    function () {

        describe('Event service test cases', function() {
            var EventsService;
            beforeEach(angular.mock.module("lafete"));
            beforeEach(inject(function($injector){
             EventsService = $injector.get("EventsService");
            }));
            it('should exist', function () {
                expect(EventsService).toBeDefined();
            });

            it('should call $http.get in auth', function () {
                var cemil;
                spyOn(EventsService,'getAllEvents').and.callFake(function(call){
                       call({data:"zafer"});
                });
                EventsService.getAllEvents(function(data){
                    cemil = data.data;
                });
                expect(cemil).toBe("zafer");
            });
        });

    });