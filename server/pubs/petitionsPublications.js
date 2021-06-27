import { Meteor } from 'meteor/meteor';
import Petitions from './../../lib/petitions'

Meteor.publish('petitions', function publishPetitions() {
    console.log('petitions pub')
  return Petitions.find({});
});