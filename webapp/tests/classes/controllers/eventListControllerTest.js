/**
 * Created by Zmote on 01.12.2015.
 */
define(['app/controllers/EventController','AngularMock'], function (EventController,AngularMock) {
    'use strict';
    describe('EventListController', function() {
        describe('property scope', function() {
            var scope, http;
            beforeEach(AngularMock.inject(function($injector){
                scope = $injector.get('$rootScope').$new();
                http = $injector.get('$http');
            }));
            it('contains 3 events', function() {

                var eventController = new EventController(scope,$http);

                expect(3).toBe(eventController.scope.events.length);
            });
        });
    });
});