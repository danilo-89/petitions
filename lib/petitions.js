const Petitions = new Mongo.Collection('petitions', () => {
    if (Meteor.isClient) {
        Petitions.deny({
            insert() {
                return true;
            },
            update() {
                return true;
            },
            remove() {
                return true;
            },
        });

        Petitions.userCanInsert = function (/* userId, doc */) {
            return true;
        };
        Petitions.userCanUpdate = function (/* userId, doc */) {
            return true;
        };
        Petitions.userCanRemove = function (/* userId, doc */) {
            return true;
        };
    }

    if (Meteor.isServer) {
        Petitions.allow({
            insert(userId, doc) {
                return Petitions.userCanInsert(userId, doc);
            },
            update(userId, doc, fields, modifier) {
                return Petitions.userCanUpdate(userId, doc);
            },
            remove(userId, doc) {
                return Petitions.userCanRemove(userId, doc);
            },
        });
        Petitions.before.insert((userId, doc) => {
            doc.createdAt = new Date();
            doc.createdBy = userId;
            doc.modifiedAt = doc.createdAt;
            doc.modifiedBy = doc.createdBy;
            if (!doc.createdBy) doc.createdBy = userId;
        });
        Petitions.before.update((userId, doc, fieldNames, modifier, options) => {
            modifier.$set = modifier.$set || {};
            modifier.$set.modifiedAt = new Date();
            modifier.$set.modifiedBy = userId;
        });
        Petitions.before.remove((userId, doc) => { });
        Petitions.after.insert((userId, doc) => { });
        Petitions.after.update((userId, doc, fieldNames, modifier, options) => { });
        Petitions.after.remove((userId, doc) => { });
    }
})


export default Petitions;
// OneMinTradeBinsSchema = new SimpleSchema({

// });

// OneMinTradeBins.attachSchema(OneMinTradeBinsSchema);
