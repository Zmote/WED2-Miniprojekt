/**
 * Created by Dogan on 12.11.15.
 */
define(['frameworks/angular','libraries/angularRoute'], function (Angular ,ngRoute) {


    var Lafete = Angular.module('lafete', ["ngRoute"]);


    Angular.element(document).ready(function() {

        /* Regiter all services modules controllers  */
        require(["classes/controllers/controller.references"], function (references){
            require(references, function(){
                Angular.bootstrap(document, [Lafete.name]);
            });

        })

    });
});