
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
            var EventsService,$location,form,$http,events,event,$httpBackend,guest;
            beforeEach(module("lafete"));
            beforeEach(inject(function($injector){
                $httpBackend = $injector.get("$httpBackend");
                $http = $injector.get("$http");
                $location = $injector.get("$location");
                var $controller = $injector.get("$controller");
                EventsService = $injector.get("EventsService");
                form = {"name":"zafer","description":"AV\\IIBpt","targetGroup":"[XZRwaXn","location":{"city":"cW`pvqly","name"
                    :"iv]QlkNI","street":"HnYkkniq","zipCode":"VlXivZvo"},"times":{"begin":"5.6.1046","end":"19.3.1264"}
                    ,"guests":[]};
            }));

            beforeEach(function(){
                events = [{"name":"Dinner","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"ReDm54Wb2DYBpIsD"},
                    {"name":"HSR-Party","description":"Party an der HSR","targetGroup":"Studenten","contributionDescription":"Kuchen","location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1447614000000,"end":1321412400000},"maximalAmountOfGuests":5,"guests":[{"id":"4JQe-bNEg","name":"Michael","contribution":"Schoggi-Kuchen","comment":"Bin sicher zu fr�h","canceled":false},{"id":"4Jxml-ZNVe","name":"Hans","contribution":"Hotdog-Cake","comment":null,"canceled":false}],"_id":"yXJu73m5O02nUj8L"},
                    {"name":"Zafers Big Event","description":"Awesome event","targetGroup":"Students","contributionDescription":"Something","location":{"city":"Schmerikon","name":"Unknown","street":"Some street","zipCode":8716},"times":{"begin":"12.12.2015","end":"13.12.2015"},"maximalAmountOfGuests":12,"guests":[{"id":"4yE2GCsEe","name":"Zafer","contribution":"Nothing, hahaha¨!","comment":"I am the host","canceled":false}],"_id":"LrhtRB68sC5vaDM6"}
                ];
                event = {"name":"Dinner","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"1"};
                guest = {id:1,name:"Zafer",comment:"I am awesome",contribution:"Cake",canceled:"false"};
            });

            afterEach(function(){
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should exist', function () {
                expect(EventsService).toBeDefined();
            });

            it('should call getAllEvents with fake respond', function(){
                spyOn(EventsService, 'getAllEvents').and.callFake(function (call) {
                       call ( {'foo' : "bar"} );
                });
                var result;
                EventsService.getAllEvents(function (data){
                    result = data;
                });
                expect(result.foo).toEqual("bar");
            });

            it('should call EventsService.getAllEvents with Fake', function () {
                spyOn(EventsService, 'getAllEvents').and.callFake(function (call) {
                    call ( {'foo' : "bar"} );
                });
                var result;
                EventsService.getAllEvents(function (data){
                    result = data;
                });
                expect(result.foo).toEqual("bar");
            });

            it("should call $http.get on EventsService.getAllEvents",function(){
                $httpBackend.whenGET("/api/events").respond(200,events);
                spyOn($http,"get").and.callThrough();
                var result;
                EventsService.getAllEvents(function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result.data.length).toBe(3);
                expect($http.get).toHaveBeenCalled();
                expect($http.get).toHaveBeenCalledWith("/api/events");
            });

            it("should call $http.post on EventsService.saveNewEvent",function(){
                $httpBackend.whenPOST("/api/events").respond(200,event);
                spyOn($http,"post").and.callThrough();
                var result;
                EventsService.saveNewEvent(event,function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.post).toHaveBeenCalled();
                expect($http.post).toHaveBeenCalledWith("/api/events",event);
            });

            it("should call $http.get on EventsService.getEventById",function(){
                $httpBackend.whenGET("/api/events/1").respond(200,event);
                spyOn($http,"get").and.callThrough();
                var result;
                EventsService.getEventById(1,function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.get).toHaveBeenCalled();
                expect($http.get).toHaveBeenCalledWith("/api/events/1");
            });

            it("should call $http.post on EventsService.saveNewGuest",function(){
                $httpBackend.whenPOST("/api/events/1/guests").respond(200,guest);
                spyOn($http,"post").and.callThrough();
                var result;
                EventsService.saveNewGuest(guest,1,function(data){
                    console.log("I am dat:",data);
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.post).toHaveBeenCalled();
                expect($http.post).toHaveBeenCalledWith("/api/events/1/guests",guest);
            });

            it("should call $http.post on EventsService.updateEvent",function(){
                $httpBackend.whenPOST("/api/events/1").respond(200,event);
                spyOn($http,"post").and.callThrough();
                var result;
                EventsService.updateEvent(event,function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.post).toHaveBeenCalled();
                expect($http.post).toHaveBeenCalledWith("/api/events/1",event);
            });

            it("should call $http.post on EventsService.deleteEvent",function(){
                $httpBackend.whenPOST("/api/events/delete/1").respond(200,event);
                spyOn($http,"post").and.callThrough();
                var result;
                EventsService.deleteEvent(event,function(data){
                    result = data;
                });
                $httpBackend.flush();
                expect(result).toBeDefined();
                expect(result).toEqual(jasmine.any(Object));
                expect($http.post).toHaveBeenCalled();
                expect($http.post).toHaveBeenCalledWith("/api/events/delete/1");
            });

        });


    });
