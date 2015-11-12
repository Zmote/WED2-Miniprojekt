/**
 * Created by Dogan on 12.11.15.
 */
define(['frameworks/angular','app/controllers/EventController'], function (Angular ,eventController) {

    // Create new empty app/module named 'lafete'

    var Lafete = Angular.module('lafete', ["ngRoute"]);

    Lafete.controller("EventController", eventController);
    eventController.$inject = ["$scope", "$http"];

    return Lafete;
});