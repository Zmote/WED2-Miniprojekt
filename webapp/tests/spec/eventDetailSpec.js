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

        describe("event detail test suite",function(){
            beforeEach(angular.mock.module("lafete"));

            var $scope, $rootScope,EventsService, $httpBackend, $routeParams,AddPersonToEvent,$toaster,GuestService;
            var guest = {"_id":1,"name":"erfqew","contribution":"wqefqwe","comment":"fqwef","canceled":false};

            beforeEach(inject(function($injector) {
                $toaster = $injector.get('toaster');
                $rootScope = $injector.get("$rootScope");
                $httpBackend = $injector.get("$httpBackend");
                var $controller = $injector.get("$controller");
                $routeParams = $injector.get("$routeParams");
                $scope = $rootScope.$new();

                EventsService = $injector.get("EventsService");
                GuestService = $injector.get("GuestService");

                $controller('EventDetail', {
                    $scope: $scope,
                    EventsService:EventsService
                });
            }));

            it("should call $scope.getEventDetails on init",function(){
                spyOn($scope,'getEventDetails');
                $scope.init();
                expect($scope.getEventDetails).toHaveBeenCalled();
            })

            it("should call $scope.getEventDetails on init with routeParams",function(){
                spyOn($scope,'getEventDetails');
                $routeParams.id = 2;
                $scope.init();
                expect($scope.getEventDetails).toHaveBeenCalledWith(2);
            })

        });

    });