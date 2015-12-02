define(['moment','lafete'], function (moment,lafete) {

         var AddEventController = function ($scope,$http, EventsService,toaster,$location){
             //var formValidity = false;
             $scope.cemil = true;
             //$scope.dateStatus = false;
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
                     if(!$scope.testDate(event.times.begin)){
                         toaster.pop("error","Begin Date wrong, please check input Format, needs to be dd.mm.yyyy");
                         return;
                     }
                     if(!$scope.testDate(event.times.end)){
                         toaster.pop("error","End Date wrong, please check input Format, needs to be dd.mm.yyyy");
                         return;
                     }

                     if(moment(event.times.begin,"DD.MM.YYYY").toDate().getTime() > moment(event.times.end,"DD.MM.YYYY").toDate().getTime()){
                         toaster.pop("error","End time can't be before Begin Time");
                         return;
                     }
                     var zafer = angular.copy(event);
                     zafer.times.begin = moment(event.times.begin,"DD.MM.YYYY").toDate().getTime();
                     zafer.times.end = moment(event.times.end,"DD.MM.YYYY").toDate().getTime();
                     EventsService.saveNewEvent(zafer, function (data){
                         console.log("result of saved event", data);
                         $location.path('#/events');
                     });
                 }
             };

             $scope.fillOutForm = function(event){

                 event.contributionDescription = $scope.genereteInput("string");
                 event.description =  $scope.genereteInput("string");
                 event.location = {
                     city :  $scope.genereteInput("string"),
                     name :  $scope.genereteInput("string"),
                     street :  $scope.genereteInput("string"),
                     zipCode :  $scope.genereteInput("string")
                 };
                 event.maximalAmountOfGuests = $scope.genereteInput("string");
                 event.name = $scope.genereteInput("string");
                 event.targetGroup = $scope.genereteInput("string");
                 event.times =
                 {
                    begin: $scope.genereteInput("date"),
                    end :  $scope.genereteInput("date")
                 }

             };

             $scope.testDate = function(str){
                 return moment( str, ["dd.MM.yyyy"]).isValid();
             }


             $scope.genereteInput = function (type){
                 var val = "d-m-fyyy";

                 if(type == "string"){
                     return val.split('').map(function(char, i){

                         var random = Math.floor(Math.random()* 57 +65);
                         return String.fromCharCode(random);
                     }).join("");

                 }

                 if(type == "date"){
                     return val.split('').map(function(char, i){
                         if(char == "-")
                           return "/";

                         if(char == "d")
                             return Math.floor(Math.random()* 30 + 1);
                         if(char == "m")
                             return Math.floor(Math.random()* 11 + 1);
                         if(char == "f")
                             return Math.floor(Math.random()* 1 + 1 );
                         if(char == "y")
                             return Math.floor(Math.random()* 8 );

                     }).join("");

                 }



             }

         }

         AddEventController.$inject =  ["$scope", "$http", "EventsService","toaster","$location"];

         lafete.controller("AddEventController", AddEventController);

         return AddEventController;


});