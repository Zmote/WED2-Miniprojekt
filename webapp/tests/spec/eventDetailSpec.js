define(["angular","angularMocks",
        "ngRoute","angular-animate",
        "angular-toast",
        "moment",
        "lafete",
        "EventsService",
        "angularResource",
        "EventDetail",
        "GuestService"
    ] ,
    function ( ) {

        describe("event detail test suite",function(){
            beforeEach(angular.mock.module("lafete"));

            var $scope, $rootScope,EventsService, $httpBackend, $routeParams,event,data,$toaster,GuestService,$location
            var guest = {"_id":1,"name":"erfqew","contribution":"wqefqwe","comment":"fqwef","canceled":false};

            beforeEach(inject(function($injector) {
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
                var EventDetail = $controller('EventDetail', {
                    $scope: $scope,
                    EventsService:EventsService,
                    $routeParams:{id:2}
                });
            }));

            beforeEach(function(){
                event = {"name":"HSR-Party im Gebäude 5","description":"Party an der HSR","targetGroup":"Studenten und Eltern","contributionDescription":"Kuchen","location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1447542000000,"end":1479337200000},"maximalAmountOfGuests":5,"guests":[{"id":"4JQe-bNEg","name":"Michael","contribution":"Schoggi-Kuchen","comment":"Bin sicher zu fr�h","canceled":false},{"id":"4Jxml-ZNVe","name":"Hans","contribution":"Hotdog-Cake","comment":"Döner Kebab","canceled":true},{"id":"EkW1x7u4e","name":"Cemil","contribution":"Wasup","comment":"Nichts los","canceled":false}],"_id":"yXJu73m5O02nUj8L"};
                data = {data: event};
                $httpBackend.expectGET('/api/events/2');
                $httpBackend.whenGET('/api/events/2').respond(200,event);
            });

            afterEach(function(){
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it("should call $scope.getEventDetails on init",function(){
                spyOn($scope,'getEventDetails');
                $scope.init();
                expect($scope.getEventDetails).toHaveBeenCalled();
            });

            it("should call $scope.getEventDetails on init with routeParams",function(){
                spyOn($scope,'getEventDetails');
                $routeParams.id = 2;
                $scope.init();
                expect($scope.getEventDetails).toHaveBeenCalledWith(2);
            });

            it("should call EventsService.getEventById",function(){
                spyOn(EventsService,"getEventById");
                $routeParams.id = 2;
                $scope.getEventDetails(2);
                expect(EventsService.getEventById).toHaveBeenCalled();
            });

            it("should set $scope.selectedEvent on calling $scope.setRetrievedData",function(){
                $routeParams.id = 2;
                $scope.setRetrievedData(data);
                expect($scope.selectedEvent).toBeDefined();
            });

            it("should set $scope.registeredUsers on calling $scope.setRetrievedData",function(){
                $routeParams.id = 2;
                $scope.setRetrievedData(data);
                expect($scope.registeredUsers).toBeDefined();
            });

            it("should set $scope.selectedEvent.isEditable to true on calling $scope.setRetrievedData",function(){
                $routeParams.id = 2;
                $scope.setRetrievedData(data);
                expect($scope.selectedEvent.isEditable).toBe(true);
            });

            it("should grow $scope.registeredUsers when guest not canceled",function(){
                $scope.registeredUsers = [];
                var myguest = {name:"Zafer",contribution:"Coca Cola",comment:"All is well", canceled:false};
                $scope.checkRegisteredUsers(event);
                var before = $scope.registeredUsers.length;
                event.guests.push(myguest);
                $scope.checkRegisteredUsers(event);
                var after = $scope.registeredUsers.length;
                expect(after).toBeGreaterThan(before);
            });

            it("should change status of isEditable on calling $scope.changeEditableStatus",function(){
                var myguest = {name:"Zafer",contribution:"Coca Cola",comment:"All is well", canceled:false};
                myguest.isEditable = true;
                $scope.changeEditableStatus(myguest);
                expect(myguest.isEditable).toBe(false);
            });

            it("should change canceled status to true on calling $scope.deleteGuest",function(){
                var myguest = {id: 2,name:"Zafer",contribution:"Coca Cola",comment:"All is well", canceled:false};
                $httpBackend.whenPOST('/api/events/1/guests/2').respond(200);
                $httpBackend.expectPOST('/api/events/1/guests/2');
                $httpBackend.expectGET('/api/events/1');
                $httpBackend.whenGET('/api/events/1').respond(200,event);
                $scope.deleteGuest(myguest,{_id:1});
                expect(myguest.canceled).toBe(true);
            });

            it("should call GuestService.updateGuest on calling $scope.deleteGuest",function(){
                spyOn(GuestService,"updateGuest");
                var myguest = {name:"Zafer",contribution:"Coca Cola",comment:"All is well", canceled:false};
                $scope.deleteGuest(myguest,{});
                expect(GuestService.updateGuest).toHaveBeenCalled();
            });

            it("should call $scope.changeEditableStatus on calling $scope.deleteGuest",function(){
                spyOn($scope,"changeEditableStatus");
                $httpBackend.whenPOST('/api/events/1/guests/2').respond(200);
                $httpBackend.expectPOST('/api/events/1/guests/2');
                $httpBackend.expectGET('/api/events/1');
                $httpBackend.whenGET('/api/events/1').respond(200,event);
                var myguest = {id:2,name:"Zafer",contribution:"Coca Cola",comment:"All is well", canceled:false};
                $scope.deleteGuest(myguest,{_id:1});
                expect($scope.changeEditableStatus).toHaveBeenCalled();
            });

            it("should redirect to AddPerson view of current event",function(){
                $scope.registeredUsers = [];
                event._id = 2;
               $scope.addGuest(event);
                expect($location.path()).toBe("/event/2/person");
            });

            it("should warn that maximal Amount of guests is reached",function(){
                spyOn($toaster,"pop");
                var myguest = {name:"Zafer",contribution:"Coca Cola",comment:"All is well", canceled:false};
                $scope.registeredUsers = [];
                for(var i = 0; i < 10;i++){
                    $scope.registeredUsers.push(myguest);
                }
                event.maximalAmountOfGuests = 2;
                $scope.addGuest(event);
                expect($toaster.pop).toHaveBeenCalledWith("error", "Max. amount of guests reached!");
            })

            it("should check if dates are correct",function(){
                spyOn($toaster,"pop");
                event.times.begin = "22.11.2015";
                event.times.end = "21.11.2015";
                $scope.updateEvent(event);
                expect($toaster.pop).toHaveBeenCalledWith("error","End time can't be before Begin Time");
            });

            it("should call EventsService.updateEvent when input is correct",function(){
               spyOn(EventsService,"updateEvent");
                spyOn($toaster,"pop");
                event.times.begin = "21.11.2015";
                event.times.end = "25.11.2015";
                $scope.updateEvent(event);
                expect($toaster.pop).not.toHaveBeenCalled();
                expect(EventsService.updateEvent).toHaveBeenCalled();
            });

            it("should call EventsService.deleteEvent",function(){
               spyOn(EventsService,"deleteEvent");
                $scope.deleteEvent(event);
                expect(EventsService.deleteEvent).toHaveBeenCalled();
            });

            it("should change location to #/events on $scope.changeLocation",function(){
                spyOn($location,'path');
                $scope.changeLocation();
                expect($location.path).toHaveBeenCalledWith('#/events');
            });

        });

    });