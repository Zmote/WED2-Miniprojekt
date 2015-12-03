
var allTestFiles = [];
var TEST_REGEXP = /spec\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    //console.log("file anme ==> ", file);
    if (TEST_REGEXP.test(file)) {


        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths

        //console.log("file anme ==> ", file);
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/',


    paths :{
        "angular":'./webapp/source/frameworks/angular/angular',
        "ngRoute":'webapp/source/libraries/angular-route/angular-route',
        "angular-animate" : 'webapp/source/libraries/angular-animate/angular-animate',
        "angular-toast" : 'webapp/source/libraries/AngularJS-Toaster/toaster',
        "moment": "webapp/source/libraries/moment/moment",
        "lafete": "webapp/source/classes/modules/lafete",
        "ControllerReferences": "webapp/source/classes/controllers/controllerReferences",
        "AddEventController": "webapp/source/classes/controllers/AddEventController",
        "EventsServiceProvider": "webapp/source/classes/services/eventService",
        "angularMocks":'webapp/tests/lib/angular-mocks/angular-mocks',
        "angularResource":'webapp/tests/lib/angular-resource/angular-resource'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },

        'ngRoute': {
            deps: ['angular'],
            exports: 'ngRoute'
        },
        'angularResources': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-toast': {
            deps: ['angular','angular-animate']

        },
        "angularMocks": {
            deps: ['angular']
        },
        "angularResource":{
            deps: ['angular']
        }
    },
    // dynamically load all test files
    deps:  allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});