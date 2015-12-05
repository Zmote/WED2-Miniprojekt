
define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "ControllerReferences",
        "EventsServiceProvider",
        "angularResource",
        "AddEventController"
    ] ,
    function () {

        describe('Event service test cases', function() {
            var EventsService,eventsBefore,eventsAfter,event,timeout,$location,form;
            beforeEach(module("lafete"));
            beforeEach(inject(function($injector){
                $location = $injector.get("$location");
                var $controller = $injector.get("$controller");
                EventsService = $injector.get("EventsService");
                form = {"name":"zafer","description":"AV\\IIBpt","targetGroup":"[XZRwaXn","location":{"city":"cW`pvqly","name"
                    :"iv]QlkNI","street":"HnYkkniq","zipCode":"VlXivZvo"},"times":{"begin":"5.6.1046","end":"19.3.1264"}
                    ,"guests":[]};
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
                });

                expect(result.foo).toEqual("bar");


            });
            it('should call $http.get in auth', function ( ) {

                spyOn(EventsService, 'getAllEvents').and.callFake(function (call) {
                    call ( {'foo' : "bar"} );

                });

                var result;
                EventsService.getAllEvents(function (data){
                    result = data;
                });

                expect(result.foo).toEqual("bar");

            });

        });


    });
