


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

		var $scope, $rootScope,EventsService, $httpBackend;
        var form = {"name":"zafer","description":"AV\\IIBpt","targetGroup":"[XZRwaXn","location":{"city":"cW`pvqly","name"
			:"iv]QlkNI","street":"HnYkkniq","zipCode":"VlXivZvo"},"times":{"begin":"5.6.1046","end":"19.3.1264"}
			,"guests":[]};
		var formValidity = {};

		beforeEach(inject(function($injector) {
			$rootScope = $injector.get("$rootScope");
			var $controller = $injector.get("$controller");
			$httpBackend = $injector.get("$httpBackend");
			$scope = $rootScope.$new();

			EventsService = $injector.get("EventsService");



			var AddEventcontroller = $controller('AddEventController', {
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

		})



		it("testdate function should return  spy on ", function (){
			formValidity.$valid = true;

			$httpBackend.when('POST', '/api/events').respond({data:"cemil"});

			$scope.saveNewEvent(form,formValidity);

			$httpBackend.flush();
			expect("cemil").toBe($scope.saveResult.data.data);
		})



	});

});
