define(['moment'], function (moment) {

         var AddEventController = function ($scope,$http, EventsService,toaster,$location){
             $scope.cemil = true;
             var event = $scope.event = {};
             event.contributionDescription = "";
             event.description =  "";
             event.location = {
                 city :  "",
                 name :  "",
                 street :  "",
                 zipCode :  ""
             };
             event.maximalAmountOfGuests =  "";
             event.name = "";
             event.targetGroup = "";
             event.times = {begin: "", end :  "" };

             $scope.saveNewEvent = function ( event, formValidity ){

                 if(event.name || event.contributionDescription || event.description || event.location.city
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

                     zafer.times.begin = new Date(event.times.begin);
                     zafer.times.end = new Date(event.times.end);

                     EventsService.saveNewEvent(event, function (data){
                          //console.log("result of saved event", data);
                          $scope.saveResult = data;
                         $location.path('#/events');
                     });

                 }
             };

             $scope.testDate = function(str){
                 return moment( str, ["dd.MM.yyyy"]).isValid();
             }

         };

         return AddEventController;


});