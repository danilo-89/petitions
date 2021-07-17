import { Meteor } from 'meteor/meteor';
import Petitions from './../../lib/petitions'
import Images from '/lib/dropbox.js';

Meteor.publish('files.all', function () {
    return Images.find().cursor;
});

Meteor.publish('petitions', function publishPetitions() {
    return Petitions.find({});
});

Meteor.publish('petitionSingle', function publishPetitions(petId) {
    return Petitions.find({ _id: petId });
});