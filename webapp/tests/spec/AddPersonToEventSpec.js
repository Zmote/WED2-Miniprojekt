


define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "ControllerReferences",
        "EventsService",
        "angularResource",
        "AddPersonToEvent",

    ] ,
    function ( ) {


        describe('Add person to event controller suit', function() {
            beforeEach(angular.mock.module("lafete"));

            var $scope, $rootScope,EventsService, $httpBackend, $routeParams;
            var guest = {"_id":1,"name":"erfqew","contribution":"wqefqwe","comment":"fqwef","canceled":false};

            beforeEach(inject(function($injector) {
                $rootScope = $injector.get("$rootScope");
                var $controller = $injector.get("$controller");
                $httpBackend = $injector.get("$httpBackend");
                $routeParams = $injector.get("$routeParams");
                $scope = $rootScope.$new();

                EventsService = $injector.get("EventsService");



                var AddPersonToEvent = $controller('AddPersonToEvent', {
                    $scope: $scope,
                    EventsService:EventsService
                });
            }));



            it('just checking',  function() {

                $routeParams.eventId = "2";

                $httpBackend.when('POST', '/api/events/2/guests').respond({"_id":1,"name":"zafo","contribution":"nothing just eat","comment":"hoi","canceled":false});

                $scope.saveNewGuest(guest);

                $httpBackend.flush();
                expect("zafo").toBe($scope.savedGuest.data.name);
            });



        });

    });