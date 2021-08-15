const Counts = new Mongo.Collection('counts', () => {
    if (Meteor.isClient) {
        Counts.deny({
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

        Counts.userCanInsert = function (/* userId, doc */) {
            return true;
        };
        Counts.userCanUpdate = function (/* userId, doc */) {
            return true;
        };
        Counts.userCanRemove = function (/* userId, doc */) {
            return true;
        };
    }

    if (Meteor.isServer) {
        Counts.allow({
            insert(userId, doc) {
                return Counts.userCanInsert(userId, doc);
            },
            update(userId, doc, fields, modifier) {
                return Counts.userCanUpdate(userId, doc);
            },
            remove(userId, doc) {
                return Counts.userCanRemove(userId, doc);
            },
        });
        Counts.before.insert((userId, doc) => {
            doc.createdAt = new Date();
            doc.createdBy = userId;
            doc.modifiedAt = doc.createdAt;
            doc.modifiedBy = doc.createdBy;
            if (!doc.createdBy) doc.createdBy = userId;
        });
        Counts.before.update((userId, doc, fieldNames, modifier, options) => {
            modifier.$set = modifier.$set || {};
            modifier.$set.modifiedAt = new Date();
            modifier.$set.modifiedBy = userId;
        });
        Counts.before.remove((userId, doc) => { });
        Counts.after.insert((userId, doc) => { });
        Counts.after.update((userId, doc, fieldNames, modifier, options) => { });
        Counts.after.remove((userId, doc) => { });
    }
})


export default Counts;
// OneMinTradeBinsSchema = new SimpleSchema({

// });

// OneMinTradeBins.attachSchema(OneMinTradeBinsSchema);
