/**
 * Created by Dogan on 12.11.15.
 */
define(['angular','ngRoute','angular-animate','angular-toast' ,'moment' ], function (Angular ,ngRoute , Animate, Toaster,moment) {


    var Lafete = Angular.module('lafete', ["ngRoute" ,"ngAnimate","toaster"]);

    Angular.element(document).ready(function() {

        /* Regiter all services modules controllers in this file below */
        require(["classes/controllers/controller.references"], function (references){
            require(references, function(){
                Angular.bootstrap(document, [Lafete.name]);
            });

        })

    });
});