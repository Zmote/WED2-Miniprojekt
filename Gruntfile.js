
/**
 * Created by Dogan on 30.11.15.
 */
module.exports = function (grunt){
    'use strict';

    grunt.initConfig({
        pkg: '<json:packege.json>',

        karma : {

            karma: {
                configFile : "karma.conf.js"
            }
        },

        jsHint : {
            files : ['**/*.js'],

            options : {
                ignores : [
                    '**/node_modules/**',
                ],
                reporter : "checkstyle",
                reporterOutput :"result.xml",
                strict : true,
                globals : {
                    describe : true,
                    afterEach : true,
                    beforeEach : true,
                    inject : true,
                    it: true,
                    jasmine : true,
                    expect : true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask ("test", ["jshint", "karma"]);






}