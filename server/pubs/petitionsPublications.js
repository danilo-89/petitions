import { Meteor } from 'meteor/meteor';
import Petitions from './../../lib/petitions'
import Images from '/lib/dropbox.js';

Meteor.publish("userAuthor", function (userId) {
    console.log("inside2")
    return Meteor.users.find(
        {_id: 'GXGWrxofJ5yGNnCxs'},
        { fields: { username: 1, 'profile.picture': 1 } }
    );
});

Meteor.publish("userData", function () {
    if (!this.userId) {
        return this.ready();
    }
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish('files.all', function () {
    return Images.find().cursor;
});

Meteor.publish('petitions', function publishPetitions() {
    return Petitions.find({});
});

Meteor.publish('petitionSingle', function publishPetitions(petId) {
    return Petitions.find({ _id: petId });
});