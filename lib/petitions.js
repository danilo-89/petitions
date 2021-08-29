import SimpleSchema from "simpl-schema";

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

PetitionsSchema = new SimpleSchema({
    title: {
      type: String,
      optional: false,
      index: 'text',
      custom: function() {
        const v = this.value;
        if(v.length >= 5 && v.length <= 90) {
          return undefined;
        } else {
          throw new Meteor.Error('wrong-value', 'Title must be between 5 and 90 character long')
        }
      }
    },
    towards: {
      type: String,
      optional: false,
      index: false,
      custom: function() {
        const v = this.value;
        if(v.length >= 4 && v.length <= 75) {
          return undefined;
        } else {
          throw new Meteor.Error('wrong-value', 'For must be between 4 and 75 character long')
        }
      }
    },
    overview: {
      type: String,
      optional: false,
      index: false,
      custom: function() {
        const v = this.value;
        if(v.length >= 15 && v.length <= 500) {
          return undefined;
        } else {
          throw new Meteor.Error('wrong-value', 'Overview must be between 15 and 500 character long')
        }
      }
    },
    details: {
      type: String,
      optional: false,
      index: false,
      custom: function() {
        const v = this.value;
        if(v.length >= 15 && v.length <= 1200) {
          return undefined;
        } else {
          throw new Meteor.Error('wrong-value', 'Details must be between 15 and 1200 character long')
        }
      }
    },
    imageCover: {
      type: String,
      optional: false,
      index: false,
    },
    video: {
      type: String,
      optional: true,
      index: false,
    },
    milestone: {
      type: Number,
      optional: false,
      index: false,
    },
    fields: {
      type: Array,
      optional: false,
      index: false,
    },
    'fields.$': {
      type: Object,
      blackbox: true,
    },
    totalSignatures: {
      type: Number,
      optional: true,
      index: false,
    },
    createdAt: {
      type: Date,
      optional: false,
      index: false,
    },
    userId: {
      type: String,
      optional: false,
      index: false,
    },
  });

Petitions.attachSchema(PetitionsSchema);

export default Petitions;
// OneMinTradeBinsSchema = new SimpleSchema({

// });

// OneMinTradeBins.attachSchema(OneMinTradeBinsSchema);











// PostsSchema = new SimpleSchema({
//     vendor: {
//       type: String,
//       optional: false,
//       index: true,
//     },
//     vendorGroup: {
//       type: String,
//       optional: false,
//       index: true,
//     },
//     postType: {
//       type: String,
//       optional: false,
//       index: true,
//     },
//     outletCategory: {
//       type: String,
//       optional: true,
//       index: true,
//     },
//     clubCategory: {
//       type: String,
//       optional: true,
//       index: true,
//     },
//     visible: {
//       type: String,
//       optional: false,
//     },
//     state: {
//       type: String,
//       optional: false,
//       defaultValue: 'active',
//     },
//     smart: {
//       type: String,
//       optional: false,
//       defaultValue: 'no',
//     },
//     postName: {
//       type: String,
//       index: true,
//       optional: false,
//       // max: 50,
//       // min: 3,
//       custom: function() {
//         const v = this.value;
//         if(v.length >= 3 && v.length <= 50) {
//           return undefined;
//         } else {
//           throw new Meteor.Error('wrong-value', 'Post name must be between 3 and 50 characters long')
//         }
//       }
//     },
//     postText: {
//       type: String,
//       index: true,
//       optional: false,
//       custom: function() {
//         const v = this.value;
//         if(v.length >= 1 && v.length <= 400) {
//           return undefined;
//         } else {
//           throw new Meteor.Error('wrong-value', 'Price must be between 1 and 400 character long')
//         }
//       }
//     },
//     postCover: {
//       type: [String],
//       optional: true,
//     },
//     hashtags: {
//       type: [String],
//       optional: false,
//       index: true,
//       custom: function() {
//         const v = this.value;
//         if(v.length >= 1 && v.length <= 4) {
//           return undefined;
//         } else {
//           throw new Meteor.Error('wrong-value', 'You must have 1 hashtags, up to maximum of 4')
//         }
//       }
//     },
//     like: {
//       type: Object,
//       index: true,
//       optional: true,
//     },
//     'like.counter': {
//       type: Number,
//       index: true,
//       optional: true,
//       defaultValue: 0, //mora defaultValue ne sme autoValue, zbog nekog razloga ne radi sa autoValue
//     },
//     'like.list': {
//       type: [Object],
//       index: true,
//       optional: true,
//       defaultValue: [],
//     },
//     'like.list.$.user': {
//       type: String,
//       optional: true
//     },
//     'like.list.$.date': {
//       type: Date,
//       optional: true
//     },
//     share: {
//       type: Object,
//       index: true,
//       optional: true,
//     },
//     'share.counter': {
//       type: Number,
//       index: true,
//       optional: true,
//       defaultValue: 0, //mora defaultValue ne sme autoValue, zbog nekog razloga ne radi sa autoValue
//     },
//     'share.list': {
//       type: [Object],
//       index: true,
//       optional: true,
//       defaultValue: [],
//     },
//     'share.like.$.user': {
//       type: String,
//       optional: true
//     },
//     'share.like.$.date': {
//       type: Date,
//       optional: true
//     },
//     wishlist: {
//       type: Object,
//       index: true,
//       optional: true,
//     },
//     'wishlist.counter': {
//       type: Number,
//       index: true,
//       optional: true,
//       defaultValue: 0, //mora defaultValue ne sme autoValue, zbog nekog razloga ne radi sa autoValue
//     },
//     'wishlist.list': {
//       type: [Object],
//       index: true,
//       optional: true,
//       defaultValue: [],
//     },
//     'wishlist.list.$.user': {
//       type: String,
//       optional: true
//     },
//     'wishlist.list.$.date': {
//       type: Date,
//       optional: true
//     },
//   });
  
//   Posts.attachSchema(PostsSchema);