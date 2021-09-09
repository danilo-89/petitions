import { Meteor } from 'meteor/meteor';
import Petitions from './../../lib/petitions'
import Signatures from '/lib/signatures.js'

Meteor.publish("userAuthor", function (userId) {
    return Meteor.users.find(
        {_id: userId},
        { fields: { username: 1, 'profile.picture': 1 } }
    );
});

Meteor.publish("chartSignatures", function (petitionId, datePeriod) {
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
        datePeriod === 'all' ? {
            petitionId: petitionId,
        } : {
            petitionId: petitionId,
            createdAt: {
                $gte: fromDate,
                $lt: todayDate
            }
        },
        {
            fields: {Age: 1, City: 1, 'Country of Residence': 1, createdAt: 1}, sort: {createdAt: -1}
        }
    );
});

Meteor.publish("chartSignaturesLast", function(petitionId) {
    return Signatures.find(
        { petitionId: petitionId },
        { fields: {'First Name': 1, Comment: 1, createdAt: 1}, sort: {createdAt: -1}, limit: 5 }
    );
});

Meteor.publish("userData", function () {
    if (!this.userId) {
        return this.ready();
    }
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish('files.all', function () {
    return this.ready();
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
    }
});

Meteor.publish('petitionsAuthor', function publishPetitions() {
        return Petitions.find(
            {userId: this.userId},
            {sort: {createdAt: -1}}
        );
});

Meteor.publish('petitionsCount', function publishPetitionsCount(term = "") {

    const _id = new Mongo.ObjectID()

    let count = 0;
    let initializing = true;

    // `observeChanges` only returns after the initial `added` callbacks have run.
    // Until then, we don't want to send a lot of `changed` messages—hence
    // tracking the `initializing` state.

    const handle = Petitions.find(term.trim() ? { $text: { $search: term } } : {}, { fields: { _id: 1, title: 1 }, sort: { createdAt: -1 } }).observeChanges({
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

    // console.log(count)
    // Stop observing the cursor when the client unsubscribes. Stopping a
    // subscription automatically takes care of sending the client any `removed`
    // messages.
    this.onStop(() => handle.stop());
});
