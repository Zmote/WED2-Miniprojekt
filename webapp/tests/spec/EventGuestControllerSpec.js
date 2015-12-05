define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "ControllerReferences",
        "EventsServiceProvider",
        "EventGuestsController",
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
                $controller('EventGuestsController', {
                    $scope: $scope,
                    EventsService: EventsService,
                    $routeParams:{id:1}
                });
            }));

            beforeEach(function(){
                event = {"name":"HSR-Party im Gebäude 5","description":"Party an der HSR","targetGroup":"Studenten und Eltern","contributionDescription":"Kuchen","location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1447542000000,"end":1479337200000},"maximalAmountOfGuests":5,"guests":[{"id":"4JQe-bNEg","name":"Michael","contribution":"Schoggi-Kuchen","comment":"Bin sicher zu fr�h","canceled":false},{"id":"4Jxml-ZNVe","name":"Hans","contribution":"Hotdog-Cake","comment":"Döner Kebab","canceled":true},{"id":"EkW1x7u4e","name":"Cemil","contribution":"Wasup","comment":"Nichts los","canceled":false}],"_id":"yXJu73m5O02nUj8L"};
                data = {data: event};
                $httpBackend.expectGET('/api/events/1');
                $httpBackend.whenGET('/api/events/1').respond(200,event);
            });

            afterEach(function(){
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it("should call $scope.getEventDetails on calling $scope.init",function(){
                spyOn($scope,"getEventDetails");
                $scope.init();
                $httpBackend.flush();
                expect($scope.getEventDetails).toHaveBeenCalled();
            });

            it("should call $scope.getEVentDetails with $routeParams.id = 1 on calling $scope.init",function(){
                spyOn($scope,"getEventDetails");
                $scope.init();
                $httpBackend.flush();
                expect($scope.getEventDetails).toHaveBeenCalledWith(1);
            });

            it("should set $scope.selectedEvent with called event on calling $scope.getEventDetails",function(){
                spyOn(EventsService,"getEventById").and.callThrough();
                $httpBackend.expectGET("/api/events/1");
                $httpBackend.whenGET("/api/events/1").respond(200,event);
                $scope.getEventDetails(1);
                $httpBackend.flush();
                expect($scope.selectedEvent).toBeDefined();
                expect($scope.selectedEvent).toEqual(event);
            });
        });
    });