const Signatures = new Mongo.Collection('signatures', () => {
    if (Meteor.isClient) {
        Signatures.deny({
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

        Signatures.userCanInsert = function (/* userId, doc */) {
            return true;
        };
        Signatures.userCanUpdate = function (/* userId, doc */) {
            return true;
        };
        Signatures.userCanRemove = function (/* userId, doc */) {
            return true;
        };
    }

    if (Meteor.isServer) {
        Signatures.allow({
            insert(userId, doc) {
                return Signatures.userCanInsert(userId, doc);
            },
            update(userId, doc, fields, modifier) {
                return Signatures.userCanUpdate(userId, doc);
            },
            remove(userId, doc) {
                return Signatures.userCanRemove(userId, doc);
            },
        });
        Signatures.before.insert((userId, doc) => {
            doc.createdAt = new Date();
            doc.createdBy = userId;
            doc.modifiedAt = doc.createdAt;
            doc.modifiedBy = doc.createdBy;
            if (!doc.createdBy) doc.createdBy = userId;
        });
        Signatures.before.update((userId, doc, fieldNames, modifier, options) => {
            modifier.$set = modifier.$set || {};
            modifier.$set.modifiedAt = new Date();
            modifier.$set.modifiedBy = userId;
        });
        Signatures.before.remove((userId, doc) => { });
        Signatures.after.insert((userId, doc) => { });
        Signatures.after.update((userId, doc, fieldNames, modifier, options) => { });
        Signatures.after.remove((userId, doc) => { });
    }
})


export default Signatures;
// OneMinTradeBinsSchema = new SimpleSchema({

// });

// OneMinTradeBins.attachSchema(OneMinTradeBinsSchema);
