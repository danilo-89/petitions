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

Meteor.publish("chartSignatures", function (datePeriod) {
    // if (!this.userId) {
    //     return this.ready();
    // }
    const todayDate = new Date()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const yearDaysAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    let fromDate =  '';

    if(datePeriod==='day') {
        fromDate =  sevenDaysAgo;
    } else if(datePeriod==='month') {
        fromDate =  thirtyDaysAgo;
    } else if (datePeriod==='year') {
        fromDate =  yearDaysAgo;
    }

    return Signatures.find(
        {
            petitionId: "N48cTF9rEoHnFti9F",
            createdAt: {
                $gte: fromDate,
                $lt: todayDate
            }
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

Meteor.publish('petitionSingle', function publishPetitions(petId) {
    return Petitions.find({ _id: petId });
});

Meteor.publish('petitions', function publishPetitions(term='', skipValue=0) {

    if (!term.trim()) {
        return Petitions.find(
            {},
            {sort: {createdAt: -1}, limit: 6, skip: skipValue}
        );
    } else {
        return Petitions.find(
            {$text: { $search: term }},
            {sort: {createdAt: -1}, limit: 6, skip: skipValue}
        );
        // return Petitions.find({title: {$regex: /^Lore/} });
    }
});

// Meteor.publish('petitionsCount', function publishPetitionsCount(term="") {
//     if (!term.trim()) {
//         return Petitions.find({}, {fields: {_id: 1, title: 1}}, {sort: {createdAt: -1}});
//     } else {
//         return Petitions.find({$text: { $search: term }}, {fields: {_id: 1, title: 1}}, {sort: {createdAt: -1}});
//     }
// });

Meteor.publish('petitionsCount', function publishPetitionsCount(term = "") {

    const _id = new Mongo.ObjectID()

    let count = 0;
    let initializing = true;

    // `observeChanges` only returns after the initial `added` callbacks have run.
    // Until then, we don't want to send a lot of `changed` messages—hence
    // tracking the `initializing` state.

    const handle = Petitions.find(term.trim() ? { $text: { $search: term } } : {}, { fields: { _id: 1, title: 1 } }, { sort: { createdAt: -1 } }).observeChanges({
        added: () => {
            count += 1;

            if (!initializing) {
                this.changed('counts', _id, { count });
            }
        },

        removed: () => {
            count -= 1;
            this.changed('counts', _id, { count });
        }

        // We don't care about `changed` events.
    });

    // Instead, we'll send one `added` message right after `observeChanges` has
    // returned, and mark the subscription as ready.
    initializing = false;
    this.added('counts', _id, { count });
    this.ready();

    console.log(count)
    // Stop observing the cursor when the client unsubscribes. Stopping a
    // subscription automatically takes care of sending the client any `removed`
    // messages.
    this.onStop(() => handle.stop());
});
