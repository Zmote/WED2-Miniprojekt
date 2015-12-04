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
	function ( ) {


	describe('test', function() {
        beforeEach(angular.mock.module("lafete"));

		var $scope, $rootScope,EventsService, $httpBackend,$toaster;
        var form = {"name":"zafercemildoganaödfkjasdföaskdj","description":"AV\\IIBpt","targetGroup":"[XZRwaXn","location":{"city":"cW`pvqly","name"
			:"iv]QlkNI","street":"HnYkkniq","zipCode":"VlXivZvo"},"times":{"begin":"5.6.1046","end":"19.3.1264"}
			,"guests":[]};
		var formValidity = {};

		beforeEach(inject(function($injector) {
			$rootScope = $injector.get("$rootScope");
            $location = $injector.get("$location");
			var $controller = $injector.get("$controller");
			$httpBackend = $injector.get("$httpBackend");
			$scope = $rootScope.$new();
            $toaster = $injector.get('toaster');
			EventsService = $injector.get("EventsService");

			$controller('AddEventController', {
				$scope: $scope,
				EventsService:EventsService
			});
		}));

		it('Should initialize value to cemil to true',  function() {
			expect($scope.cemil).toBe(true);
		});

		it("testdate function should return if input is dd.MM.yyyy", function (){
            var date = "27.12.1982";
            expect($scope.testDate(date)).toBe(true);
		});

		it("testdate function should return  spy on ", function (){
			formValidity.$valid = true;

			$httpBackend.when('POST', '/api/events').respond({data:"cemil"});

			$scope.saveNewEvent(form,formValidity);

			$httpBackend.flush();
			expect("cemil").toBe($scope.saveResult.data.data);
		});

        it("should warn that begin date has to be before end date",function(){
            $scope.event.times.begin = '22.12.2012';
            $scope.event.times.end = '21.12.2012';
            spyOn($toaster,'pop');
            $scope.saveNewEvent($scope.event,formValidity);
            expect($toaster.pop).toHaveBeenCalledWith("error","End time can't be before Begin Time");
        });

        it("should warn that date format is wrong",function(){
            $scope.event.times.begin = '22/12/2012';
            spyOn($toaster,'pop');
            $scope.saveNewEvent($scope.event,formValidity);
            expect($toaster.pop).toHaveBeenCalledWith("error","Begin Date wrong, please check input Format, needs to be dd.mm.yyyy");
        });

        it("should set cemil to false if at least one required field is",function(){
            formValidity.$valid = true;
            $scope.event.name = "Zafer";
            $scope.saveNewEvent($scope.event,formValidity);
            expect($scope.cemil).toBe(false);
        })

        it("should call EventsService.saveNewEvent when the form is valid",function(){
            spyOn(EventsService,'saveNewEvent');
            formValidity.$valid = true;
            $scope.event = {"name":"Zafers Brinner Partey","description":"Mitarbeiterdinner der HSR",
                "targetGroup":"HSR Mitarbeiter","contributionDescription":"Zafer","location":{"name":"HSR",
                    "street":"Oberseestrasse","plz":8640,"city":"Rapperswil"},"times":{"begin":'22.12.2015',
                    "end":'23.12.2015'},"maximalAmountOfGuests":8,"guests":[{"id":"4Jxza-BCne","name":"F. Meier",
                    "contribution":null,"comment":null,"canceled":true},{"id":"EktjhnFNe","name":"asdfasdfasd",
                    "contribution":"asdfa","comment":"asdf","canceled":false},{"id":"4yXjnhFVe","name":"asdfas",
                    "contribution":"asdf","comment":"asdfasdf23","canceled":false},{"id":"VkOC5htEl","name":"Zafer",
                    "contribution":"fsd","comment":"Wasnlos","canceled":true}],"_id":"ReDm54Wb2DYBpIsD"};
            $scope.saveNewEvent($scope.event,formValidity);
            expect(EventsService.saveNewEvent).toHaveBeenCalled();

        });
        /*
        it("should create a new event",function(){
            var formValidity = {};
            formValidity.$valid = true;
            $scope.saveNewEvent(form,formValidity);
            $location.path('#/events');
            $scope.$digest();
            var body = angular.element(document.getElementById("thisBody")).html();
            console.log("I am body: ", body);
        })
        */

	});

});
