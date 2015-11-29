/**
 * Server configuration
 */
var express = require('express');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
db = new Datastore({ filename: './database/datastore', autoload: true });

var allowCrossDomain = function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


/**
 * Event / guest storage
 */

var guestId = 0;

function createEvent(id, name, description, targetGroup, contributionsDescription, location, times, call){
    if(name) {
        var event = {
            name : name,
            description : description,
            targetGroup: targetGroup,
            contributionsDescription: contributionsDescription,
            location:location,
            times : times,
            guests:[]
        };

        db.insert(event,function(err,newDoc){
            if(err){
                console.log("DB insertion failed");
            }
           call(newDoc);
        });
    }else{
        call(null);
    }
}

function findEvent(id, call) {
    db.find({_id:id},function(err,docs){
        if(err){
            console.log("Could't find id!");
        }else{
            call(docs[0]);
        }
    });
}

function createGuest(event, id, name, contribution, comment, call){
    if(event && event.guests) {
        var guest = {
            id: id ? id : guestId++,
            name : name,
            contribution: contribution,
            comment: comment,
			canceled: false
        };
        db.update({_id:event._id},{$push: {guests:guest}},function(err,doc){
            if(err){
                console.log("Somthing went wrong with the update");
                if(call){
                    call(null);
                }
            }
            if(call){
                call(guest);
            }
        });
    } else {
        cal(null);
    }
}

function findGuest(event, guestId, call) {
	call(event.guests.filter(function(guest) {
		return guest.id == guestId
	})[0]);
}

/**
 * Basic server
 */
var app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json())
app.use('/api', express.static(__dirname + '/api'));
app.use('/', express.static(__dirname + '/webapp/source'));
// tests, remove this for production
app.use('/tests', express.static(__dirname + '/webapp/tests'));
app.use('/source', express.static(__dirname + '/webapp/source'));


/**
 * API routes
 */
app.get('/api/events', function(request, response) {
    response.json({ events: db.getAllData()});
});

app.post('/api/events', function(request, response) {
    createEvent(
       request.body.id,
       request.body.name,
       request.body.description,
       request.body.targetGroup,
       request.body.contributionsDescription,
       request.body.location,
       request.body.times,
        function(event){
            if(event) {
                response.json(event);
            } else {
                response.status(400).send('Event data incomplete.');
            }
        }
   );
});

app.get('/api/events/:id', function(request, response) {
    var event = findEvent(request.params.id,function(event){
        if (event) {
            response.json(event);
        } else {
            response.status(404).send('Event (id '+request.params.id+') not found.')
        }
    });

});

app.post('/api/events/:id', function(request, response) {
	findEvent(request.params.id, function(event){
        if (event) {
            if(request.body.name && request.body.name != event.name) {
                event.name = request.body.name;
            }
            if(request.body.description && request.body.description != event.description) {
                event.description = request.body.description;
            }
            if(request.body.targetGroup && event.targetGroup != request.body.targetGroup) {
                event.targetGroup = request.body.targetGroup;
            }
            if(request.body.contributionsDescription && event.contributionsDescription != request.body.contributionsDescription) {
                event.contributionsDescription = request.body.contributionsDescription;
            }
            if(request.body.location && event.location != request.body.location) {
                event.location = request.body.location;
            }
            if(request.body.times && event.times != request.body.times) {
                event.times = request.body.times;
            }
            response.json(event);
        } else {
            response.status(404).send('Event (id '+request.params.id+') not found.')
        }
    });

});

app.get('/api/events/:id/guests', function(request, response) {
    findEvent(request.params.id,function(event){
        if(event){
            response.json({ guests: event.guests });
        } else{
            response.status(404).send('Event (id '+request.params.id+') not found.')
        }
    });
});

app.post('/api/events/:id/guests', function(request, response) {
    findEvent(request.params.id,function(event){
        if(event){
            createGuest(
                event,
                request.body.id,
                request.body.name,
                request.body.contribution,
                request.body.comment,
                function(guest){
                    response.json(guest);
                }
            );
        } else{
            response.status(404).send('Event (id '+request.params.id+') not found.')
        }
    });
});

app.get('/api/events/:eventId/guests/:guestId', function(request, response) {
	findEvent(request.params.eventId,function(event){
        if(event){
            findGuest(event, request.params.guestId, function(guest){
                if(guest) {
                    response.json(guest);
                } else {
                    response.status(404).send('Guest (id '+request.params.guestId+') not found.')
                }
            });
        } else{
            response.status(404).send('Event (id '+request.params.eventId+') not found.')
        }
    });
});

app.post('/api/events/:eventId/guests/:guestId', function(request, response) {
	findEvent(request.params.eventId,function(event){
        if(event){
            findGuest(event, request.params.guestId,function(guest){
                if(guest) {
                    if(request.body.name && request.body.name != guest.name) {
                        guest.name = request.body.name;
                    }
                    if(request.body.contribution && request.body.contribution != guest.contribution) {
                        guest.contribution = request.body.contribution;
                    }
                    if(request.body.comment && request.body.comment != guest.comment) {
                        guest.comment = request.body.comment;
                    }
                    if(request.body.canceled && request.body.canceled != guest.canceled) {
                        guest.canceled = request.body.canceled;
                    }

                    response.json(guest);
                } else {
                    response.status(404).send('Guest (id '+request.params.guestId+') not found.')
                }
            });
        } else{
            response.status(404).send('Event (id '+request.params.eventId+') not found.')
        }
    });
});

/**
 * Server start
 */
var appPort = 8080;
app.listen(appPort);
console.log('Server running on port '+appPort);
