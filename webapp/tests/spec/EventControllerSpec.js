define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "EventController",
        "angularResource"
    ] ,
    function () {

        describe("Event Controller test suite",function(){
            beforeEach(angular.mock.module("lafete"));

            var $scope, $rootScope,EventsService, $httpBackend,$http,form,events,EventController,$q;
            var guest = {"_id":1,"name":"erfqew","contribution":"wqefqwe","comment":"fqwef","canceled":false};

            beforeEach(inject(function($injector) {
                $q = $injector.get('$q');
                $rootScope = $injector.get("$rootScope");
                $http = $injector.get('$http');
                $httpBackend = $injector.get("$httpBackend");
                var $controller = $injector.get("$controller");
                $scope = $rootScope.$new();
                EventsService = $injector.get("EventsService");
                form = {"name":"zafer","description":"AV\\IIBpt","targetGroup":"[XZRwaXn","location":{"city":"cW`pvqly","name"
                    :"iv]QlkNI","street":"HnYkkniq","zipCode":"VlXivZvo"},"times":{"begin":"5.6.1046","end":"19.3.1264"}
                    ,"guests":[]};

                EventController = $controller('EventController', {
                    $scope: $scope,
                    EventsService:EventsService
                });
            }));

            beforeEach(function(){
               events = [{"name":"Dinner","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"ReDm54Wb2DYBpIsD"},
                   {"name":"HSR-Party","description":"Party an der HSR","targetGroup":"Studenten","contributionDescription":"Kuchen","location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1447614000000,"end":1321412400000},"maximalAmountOfGuests":5,"guests":[{"id":"4JQe-bNEg","name":"Michael","contribution":"Schoggi-Kuchen","comment":"Bin sicher zu fr�h","canceled":false},{"id":"4Jxml-ZNVe","name":"Hans","contribution":"Hotdog-Cake","comment":null,"canceled":false}],"_id":"yXJu73m5O02nUj8L"},
                   {"name":"Zafers Big Event","description":"Awesome event","targetGroup":"Students","contributionDescription":"Something","location":{"city":"Schmerikon","name":"Unknown","street":"Some street","zipCode":8716},"times":{"begin":"12.12.2015","end":"13.12.2015"},"maximalAmountOfGuests":12,"guests":[{"id":"4yE2GCsEe","name":"Zafer","contribution":"Nothing, hahaha¨!","comment":"I am the host","canceled":false}],"_id":"LrhtRB68sC5vaDM6"}
               ];
            });

            afterEach(function(){
               $httpBackend.verifyNoOutstandingExpectation();
               $httpBackend.verifyNoOutstandingRequest();
            });

            it("should get all events on $scope.init",function(){
                $httpBackend.when('GET','/api/events').respond(200,{events:events});
                spyOn(EventsService,"getAllEvents").and.callThrough();
                $scope.init();
                $httpBackend.flush();
                expect($scope.events).toBeDefined();
            });

            it("should call EventsService.getAllEvents on $scope.init",function(){
                $httpBackend.when('GET','/api/events').respond(200,{events:events});
                spyOn(EventsService,"getAllEvents").and.callThrough();
                $scope.init();
                $httpBackend.flush();
                expect(EventsService.getAllEvents).toHaveBeenCalled();
            });


        });


    });