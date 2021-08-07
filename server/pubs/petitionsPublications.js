import { Meteor } from 'meteor/meteor';
import Petitions from './../../lib/petitions'
import Images from '/lib/dropbox.js';
import Signatures from '/lib/signatures.js'

Meteor.publish("userAuthor", function (userId) {
    console.log("inside2")
    return Meteor.users.find(
        {_id: 'GXGWrxofJ5yGNnCxs'},
        { fields: { username: 1, 'profile.picture': 1 } }
    );
});

Meteor.publish("chartSignatures", function () {
    // if (!this.userId) {
    //     return this.ready();
    // }
    return Signatures.find({petitionId: "N48cTF9rEoHnFti9F"});
});

Meteor.publish("userData", function () {
    if (!this.userId) {
        return this.ready();
    }
    console.log("inside user pub")
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish('files.all', function () {
    return Images.find().cursor;
});

Meteor.publish('petitions', function publishPetitions(term="") {
    if (!term.trim()) {
        return Petitions.find({});
    } else {
        return Petitions.find({$text: { $search: term }});
        // return Petitions.find({title: {$regex: /^Lore/} });
    }
    
});

Meteor.publish('petitionSingle', function publishPetitions(petId) {
    return Petitions.find({ _id: petId });
});