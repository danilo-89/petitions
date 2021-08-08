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

    const todayDate = new Date()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const yearDaysAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    return Signatures.find(
        {
            petitionId: "N48cTF9rEoHnFti9F",
            // createdAt: {
            //     $gte: yearDaysAgo,
            //     $lt: todayDate
            // }
        },
        {
            fields: {Age: 1, City: 1, 'Country of Residence': 1, createdAt: 1}
        },
        {
            sort: {createdAt: -1}
        }
    );
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