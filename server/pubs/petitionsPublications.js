import { Meteor } from 'meteor/meteor';
import Petitions from './../../lib/petitions'

Meteor.publish('petitions', function publishPetitions() {
    return Petitions.find({});
});

Meteor.publish('petitionSingle', function publishPetitions(petId) {
    return Petitions.find({ _id: petId });
});