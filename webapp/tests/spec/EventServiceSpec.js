


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

            var $scope, EventsService,$httpBackend;


            beforeEach(inject(function($injector) {
               EventsService = $injector.get("EventsService");
               $httpBackend = $injector.get("$httpBackend");
            }));

            it('Should initialize value to cemil to true',  function() {

                 expect(EventsService).toBeDefined();
            });

            it('Should save new event ',  function() {
                var form = {"name":"cemil"};
                //console.log("EventsService", EventsService);
                $httpBackend.when('GET','/api/events').respond(200,{"name":"cemil"});


                expect(EventsService.getAllEvents()).toBeDefined();

            });



        });

    });
