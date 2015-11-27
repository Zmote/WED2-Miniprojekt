define([], function () {
     angular
         .module("lafete")
         .controller("AddEventController", AddEventController);


         function AddEventController($scope,$http, EventsService){
             var event = $scope.event = {};
             event.contributionDescription = "";
             event.description =  "";
             event.location = {
                 city :  "",
                 name :  "",
                 street :  "",
                 zipCode :  ""
             }
             event.maximalAmountOfGuests =  "";
             event.name = "";
             event.targetGroup = "";
             event.time = {begin: "", end :  "" }


             $scope.saveNewEvent = function ( event ){
                  console.log(event)
                  EventsService.saveNewEvent(event, function (data){
                      console.log("result of saved event", data);
                  });
             }


             $scope.fillOutForm = function(event){

                 event.contributionDescription = $scope.genereteInput();
                 event.description =  $scope.genereteInput();
                 event.location = {
                     city :  $scope.genereteInput(),
                     name :  $scope.genereteInput(),
                     street :  $scope.genereteInput(),
                     zipCode :  $scope.genereteInput()
                 }
                 event.maximalAmountOfGuests = $scope.genereteInput();
                 event.name = $scope.genereteInput();
                 event.targetGroup = $scope.genereteInput();
                 event.time =
                 {
                    begin: $scope.genereteInput(),
                    end :  $scope.genereteInput()
                 }

             }


             $scope.genereteInput = function (){
                 var val = "XXX-XXX-XXX";
                 return val.split('').map(function(char, i){

                     var random = Math.floor(Math.random()* 57 +65);
                     return String.fromCharCode(random);
                 }).join("");
             }

         }

         AddEventController.$inject =  ["$scope", "$http", "EventsService"];
});