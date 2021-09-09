import SimpleSchema from "simpl-schema"

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


SignaturesSchema = new SimpleSchema({
    "First Name": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            const v = this.value;
            if (v.length >= 1 && v.length <= 55) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'First Name must be between 1 and 55 character long')
            }
        }
    },
    "Last Name": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            const v = this.value;
            if (v.length >= 1 && v.length <= 55) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'Last Name must be between 1 and 55 character long')
            }
        }
    },
    "Country of Residence": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            const v = this.value;
            if (v.length >= 2 && v.length <= 100) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'Country of Residence must be between 2 and 100 character long')
            }
        }
    },
    "City": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            const v = this.value;
            if (v.length >= 2 && v.length <= 100) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'City must be between 2 and 100 character long')
            }
        }
    },
    "Age": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            if (this.value === '') {
                return undefined;
            }
            const v = +this.value;
            if (v > 7 && v < 150) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'Age must be between 7 and 150')
            }
        }
    },
    "Phone": {
        type: String,
        optional: true,
        defaultValue: "",
    },
    "Email": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            const v = this.value;
            if (v.length >= 5 && v.length <= 100) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'Email address must be between 5 and 100')
            }
        }
    },
    "Comment": {
        type: String,
        optional: true,
        defaultValue: "",
        custom: function () {
            const v = this.value;
            if (v.length >= 0 && v.length <= 150) {
                return undefined;
            } else {
                throw new Meteor.Error('wrong-value', 'Comment must be between 0 and 150 character long')
            }
        }
    },
    "petitionId": {
        type: String,
        optional: false,
    },
    "userId": {
        type: String,
        optional: false,
    },
    "createdAt": {
        type: Date,
        optional: false,
    },
});

Signatures.attachSchema(SignaturesSchema);

export default Signatures;
