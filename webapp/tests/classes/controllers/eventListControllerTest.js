/**
 * Created by Zmote on 01.12.2015.
 */
define(['app/controllers/EventController','frameworks/angular'], function (EventController) {
    'use strict';

    describe('EventListController', function() {
        describe('property scope', function() {
            it('contains 3 events', function() {
                var scope = {};
                var eventController = new EventController(scope,$http);

                expect(3).toBe(eventController.scope.events.length);
            });
        });
    });
});