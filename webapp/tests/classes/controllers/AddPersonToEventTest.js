/**
 * Created by Zmote on 01.12.2015.
 */
define(['app/controllers/AddPersonToEvent','frameworks/angular'], function (AddPersonToEvent,Angular) {
    'use strict';

    describe('AddPersonToEvent', function() {
        describe('property scope', function() {
            it('contains 3 events', function() {
                var scope = {};
                var addPersonToEvent = new AddPersonToEvent(scope);

                expect(3).toBe(addPersonToEvent.scope.guests.length);
            });
        });
    });
});