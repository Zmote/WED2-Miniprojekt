


define(["angular","angularMocks",
		"ngRoute","angular-animate",
		"angular-toast",
		"moment",
		"lafete",
		"ControllerReferences",
		"EventsServiceProvider",
		"angularResource",
	 	"AddEventController",

	] ,
	function ( ) {


	describe('test', function() {
        beforeEach(module("lafete"));

		var $scope, $rootScope;


		beforeEach(inject(function($injector) {
			$rootScope = $injector.get("$rootScope");
			var $controller = $injector.get("$controller");
			$scope = $rootScope.$new();
			var AddEventcontroller = $controller('AddEventController', {
				$scope: $scope
			});
		}));

		it('Should initialize value to cemil to true',  function() {

			expect($scope.cemil).toBe(true);
		});

		it("testdate function should return if input is dd.MM.yyyy", function (){
           var date = "27.12.1982";
			expect($scope.testDate(date)).toBe(true);

		})



	});

});
