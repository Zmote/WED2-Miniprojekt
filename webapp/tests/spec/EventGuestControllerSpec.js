define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "ControllerReferences",
        "EventsServiceProvider",
        "angularResource",
        "EventDetail",
        "GuestServiceProvider"
    ] ,
    function ( ) {

        describe("event detail test suite",function() {
            beforeEach(angular.mock.module("lafete"));

            var $scope, $rootScope, EventsService, $httpBackend, $routeParams, event, data, $toaster, GuestService, $location;
            var guest = {"_id": 1, "name": "erfqew", "contribution": "wqefqwe", "comment": "fqwef", "canceled": false};

            beforeEach(inject(function ($injector) {
                $location = $injector.get('$location');
                $toaster = $injector.get('toaster');
                $rootScope = $injector.get("$rootScope");
                $httpBackend = $injector.get("$httpBackend");
                var $controller = $injector.get("$controller");
                $routeParams = $injector.get("$routeParams");
                $scope = $rootScope.$new();
                $eScope = $rootScope.$new();

                EventsService = $injector.get("EventsService");
                GuestService = $injector.get("GuestService");
                $controller('EventDetail', {
                    $scope: $scope,
                    EventsService: EventsService
                });
            }));

            it("should do something",function(){
                //TODO: more effin' tests
            });
        });
    });