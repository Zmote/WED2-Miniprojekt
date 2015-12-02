


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
            beforeEach(module("lafete"));

            it('should exist', inject(function (EventsService) {
                expect(EventsService).toBeDefined();
            }));

            it('should call $http.get in auth', inject(function ( $httpBackend,EventsService) {
                $httpBackend.when('GET','/api/events').respond({data:"cemil"});

                var func = function (){};
                EventsService.getAllEvents(func);
                $httpBackend.flush();



            }));

        });

    });
