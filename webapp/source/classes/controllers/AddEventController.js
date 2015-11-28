define([], function () {
     angular
         .module("lafete")
         .controller("AddEventController", AddEventController);


         function AddEventController($scope,$http, EventsService,toaster,$location){
             var formValidity = false;
             $scope.cemil = true;
             $scope.dateStatus = false;
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
             event.times = {begin: "", end :  "" };
             $scope.saveNewEvent = function ( event, formValidity ){
                 if(event.name || event.contributionsDescription || event.description || event.location.city
                     ||event.location.name || event.location.street || event.location.zipCode
                     || event.maximalAmountOfGuests || event.targetGroup || event.times.begin || event.times.end){
                     $scope.cemil = false;
                 }else{
                     $scope.cemil = true;
                 }
                 if(formValidity.$valid){
                     if(!testDate(event.times.begin)){
                         toaster.pop("error","Begin Date wrong, please check input Format, needs to be MM/DD/YYYY");
                         event.times.begin = "";
                         event.times.end = "";
                         return;
                     }
                     if(!testDate(event.times.end)){
                         toaster.pop("error","End Date wrong, please check input Format, needs to be MM/DD/YYYY");
                         event.times.begin = "";
                         event.times.end = "";
                         return;
                     }
                     var zafer = angular.copy(event);
                     zafer.times.begin = new Date(event.times.begin);
                     zafer.times.end = new Date(event.times.end);
                     EventsService.saveNewEvent(event, function (data){
                         console.log("result of saved event", data);
                         $location.path('#/events');
                     });
                 }
             };


             $scope.fillOutForm = function(event){

                 event.contributionDescription = $scope.genereteInput();
                 event.description =  $scope.genereteInput();
                 event.location = {
                     city :  $scope.genereteInput(),
                     name :  $scope.genereteInput(),
                     street :  $scope.genereteInput(),
                     zipCode :  $scope.genereteInput()
                 };
                 event.maximalAmountOfGuests = $scope.genereteInput();
                 event.name = $scope.genereteInput();
                 event.targetGroup = $scope.genereteInput();
                 event.times =
                 {
                    begin: $scope.genereteInput(),
                    end :  $scope.genereteInput()
                 }

             };

             function testDate(str){
                 var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                 if(t===null)
                     return false;
                 var d=+t[1], m=+t[2], y=+t[3];
                 //below should be more acurate algorithm
                 if(m>=1 && m<=12 && d>=1 && d<=31){
                     return true;
                 }
                 return false;
             }


             $scope.genereteInput = function (){
                 var val = "XXX-XXX-XXX";
                 return val.split('').map(function(char, i){

                     var random = Math.floor(Math.random()* 57 +65);
                     return String.fromCharCode(random);
                 }).join("");
             }

         }

         AddEventController.$inject =  ["$scope", "$http", "EventsService","toaster","$location"];
});