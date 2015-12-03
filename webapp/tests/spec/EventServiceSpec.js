
define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "ControllerReferences",
        "EventsServiceProvider",
        "angularResource",
        "AddEventController",

    ] ,
    function () {

        describe('Event service test cases', function() {
            var EventsService;
                beforeEach(module("lafete"));
            beforeEach(inject(function($injector){
                EventsService = $injector.get("EventsService");
            }));

            it('should exist', function () {
                expect(EventsService).toBeDefined();
            });

            it('should call getAllEvents with fake respond', function ( ) {

                spyOn(EventsService, 'getAllEvents').and.callFake(function (call) {
                       call ( {'foo' : "bar"} );

                });

                var result;
                EventsService.getAllEvents(function (data){
                    result = data;
                }); // does cleverness

                expect(result.foo).toEqual("bar");


            });

            it('should call $http.get in auth', function ( ) {

                spyOn(EventsService, 'getAllEvents').and.callFake(function (call) {
                    call ( {'foo' : "bar"} );

                });

                var result;
                EventsService.getAllEvents(function (data){
                    result = data;
                }); // does cleverness

                expect(result.foo).toEqual("bar");


            });
        });

    });
