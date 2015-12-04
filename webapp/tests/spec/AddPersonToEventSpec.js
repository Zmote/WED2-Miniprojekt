define(["angular","angularMocks",
		"ngRoute","angular-animate",
		"angular-toast",
		"moment",
		"lafete",
		"ControllerReferences",
		"EventsServiceProvider",
		"angularResource",
	 	"AddPersonToEvent",
		"GuestServiceProvider"
	] ,
	function ( ) {


	describe('Add person to event controller suit', function() {
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

			AddPersonToEvent = $controller('AddPersonToEvent', {
				$scope: $scope,
				EventsService:EventsService
			});
		}));

        afterEach(function(){
           $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

		it('just checking if saveNewGuest is called properly',  function() {

			$routeParams.eventId = "2";
			$httpBackend.when('POST', '/api/events/2/guests').respond({"_id":1,"name":"zafo","contribution":"nothing just eat","comment":"hoi","canceled":false});
			$scope.saveNewGuest(guest);
			$httpBackend.flush();
			expect("zafo").toBe($scope.savedGuest.data.name);
		});

		it('should be empty after saveNewGuest: $scope.guest',function(){
			$routeParams.eventId = "2";
			$httpBackend.when('POST', '/api/events/2/guests').respond({"_id":1,"name":"zafo","contribution":"nothing just eat","comment":"hoi","canceled":false});
			$scope.saveNewGuest(guest);
			$httpBackend.flush();
			expect($scope.guest).toEqual({});
		});

		it('should call error pop-up when status not 200',function(){
			spyOn($toaster,'pop');
			$scope.checkResponse({status:404});
			expect($toaster.pop).toHaveBeenCalledWith('error',"Couldn't add new Guest!");
		});

		it('should call success pop-up when status 200',function(){
			spyOn($toaster,'pop');
			var data = {status:200};
			$scope.checkResponse(data);
			expect($toaster.pop).toHaveBeenCalledWith('success',"Succesfully added new Guest!");
		});

        it('should call EventsService saveNewGuest function',function(){
            //respond(200) vs respond({status:200})
            // --> httpBackend sets status, you don't have to wrap it in an object(
            // (or the status will be default:200 always
            //sytnax of respond:  function([status,] data[, headers])
            $httpBackend.when('POST','/api/events/2/guests').respond(200);
            spyOn(EventsService,'saveNewGuest').and.callThrough();
            $routeParams.eventId = 2;
            $scope.guest = {name:"Zafer",comment:"I am Hulk!", contribution:"Green Cake"};
            $scope.saveNewGuest($scope.guest);
            $httpBackend.flush();
            expect(EventsService.saveNewGuest).toHaveBeenCalled();
            expect($scope.guest).toEqual({});
        })

	});

});
