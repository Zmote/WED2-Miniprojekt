/**
 * Created by Dogan on 08.12.15.
 */

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

            var mockEventService = {

                events : [],
                getAllEvents: function (){
                    return this.events;
                },
                emptyArray : function (){
                    this.events = [];
                }
                ,
                saveNewEvent: function (event) {
                    this.events.push(event);
                },
                getEventById : function(id){
                    return this.events.filter(function (event){
                        if(event._id == id) return event;
                    });
                },
                saveNewGuest: function (guest,eventID) {
                    for(var i=0; i < this.events.length; i++){
                        if(this.events[i]._id == eventID){
                            this.events[i].guests.push(guest);
                        }
                    }
                },
                updateEvent : function (editedEvent){
                    for(var i=0; i < this.events.length; i++){
                        if(this.events[i]._id == editedEvent._id){
                            this.events[i] = editedEvent;
                        }
                    }
                },
                deleteEvent : function (event){
                    for(var i=0; i < this.events.length; i++){
                        if(this.events[i]._id == event._id){
                            this.events.splice(this.events.indexOf(this.events[i]),1);
                        }
                    }

                }
            }
            beforeEach(module("lafete"));

            beforeEach(angular.mock.module(function ($provide){
                //console.log("provide =========>" ,$provide)
                $provide.value("EventsService",mockEventService);

            }));

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
                guest = {id:1,name:"Cemil",comment:"I am awesome",contribution:"Cake",canceled:"false"};
            });






            it("should get initial of events array length equal to 0", function (){
                expect(mockEventService.getAllEvents().length).toBe(0);
            })

            it("should saved events name", function (){
                EventsService.saveNewEvent(event);
                expect(EventsService.getAllEvents()[0].name).toBe( "Dinner");
            })

            it("should save and delete event from service", function (){
                EventsService.emptyArray();
                EventsService.saveNewEvent(event);
                EventsService.deleteEvent(event);
                expect(EventsService.getAllEvents().length).toBe(0);
            });
            it("should save two events and get second ones name", function (){
                EventsService.emptyArray();
                var event1 = {"name":"cemil","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"1"};
                var event2 = {"name":"zafer","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"2"};
                EventsService.saveNewEvent(event1);
                EventsService.saveNewEvent(event2);

                expect(EventsService.getEventById(2)[0].name).toBe("zafer");
            });





            it("should save and update an event", function (){
                EventsService.emptyArray();
                var event = {"name":"cemil","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"1"};
                EventsService.saveNewEvent(event);
                event = {"name":"zafer","description":"Mitarbeiterdinner der HSR","targetGroup":"HSR Mitarbeiter","contributionDescription":null,"location":{"name":"HSR","street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":1448042400000,"end":1321822800000},"maximalAmountOfGuests":5,"guests":[{"id":"4Jxza-BCne","name":"F. Meier","contribution":null,"comment":null,"canceled":true}],"_id":"1"};

                EventsService.updateEvent(event);

                expect(EventsService.getAllEvents()[0].name).toBe("zafer");
            });





        });


    });
