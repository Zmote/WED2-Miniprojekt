define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "EventController",
        "ControllerReferences",
        "angularResource"
    ] ,
    function () {

        describe("Event Controller test suite",function(){
            beforeEach(angular.mock.module("lafete"));

            var $scope, $rootScope,EventsService, $httpBackend,form;
            var guest = {"_id":1,"name":"erfqew","contribution":"wqefqwe","comment":"fqwef","canceled":false};

            beforeEach(inject(function($injector) {
                $rootScope = $injector.get("$rootScope");
                $httpBackend = $injector.get("$httpBackend");
                var $controller = $injector.get("$controller");
                $scope = $rootScope.$new();

                form = {"name":"zafer","description":"AV\\IIBpt","targetGroup":"[XZRwaXn","location":{"city":"cW`pvqly","name"
                    :"iv]QlkNI","street":"HnYkkniq","zipCode":"VlXivZvo"},"times":{"begin":"5.6.1046","end":"19.3.1264"}
                    ,"guests":[]};

                $controller('EventController', {
                    $scope: $scope,
                    EventsService:EventsService
                });
            }));

            it("should get all events",function(){
                //TODO: server calls?
            });


        });


    });