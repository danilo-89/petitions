import { Meteor } from "meteor/meteor";
import Petitions from "./../../lib/petitions"
import Signatures from "./../../lib/signatures"
import SimpleSchema from 'simpl-schema';
import { check } from "meteor/check";
import Images from '/lib/dropbox.js';
import { FilesCollection } from 'meteor/ostrio:files';
// import { projectStorage } from './../firebase/config'

Meteor.methods({

    // Image methods

    'UploadFile'(file) {
        // Using callback

        const buffer=Buffer.from(file,'binary');
        // Images.insert({
        //     file: file,
        //     meta: {
        //       userId: Meteor.userId() // Optional, used to check on server for file tampering
        //     },
        //     chunkSize: 'dynamic',
        //     allowWebWorkers: true // If you see issues with uploads, change this to false
        //   }, false)



        Images.write(buffer, {
            fileName: 'sample.jpeg',
            fielId: 'abc123myId', //optional
            type: 'image/jpeg'
          }, function (writeError, fileRef) {
            if (writeError) {
              throw writeError;
            } else {
              console.log(fileRef.name + ' is successfully saved to FS. _id: ' + fileRef._id);
            }
          });


        //   Images.insert({
        //     file: a,
        //     isBase64: true, // <— Mandatory
        //     fileName: 'pic.jpeg' // <— Mandatory
        //   });

    },

    'RemoveFile'(id) {
        // Using callback
        Images.remove({_id: id}, (error) => {
            if (error) {
            console.error(`File wasn't removed, error:  ${error.reason}`);
            } else {
            console.info('File successfully removed');
            }
        });
    },

    'RenameFile'(id, imageName) {
        // Using callback
        // Images.rename({_id: id, name}, (error) => {
        //     if (error) {
        //     console.error(`File wasn't removed, error:  ${error.reason}`);
        //     } else {
        //     console.info('File successfully removed');
        //     }
        // });
        Images.update({ _id: id }, {
            $set: { name: imageName }
        })
    },

    'create.account'(username, password) {
        Accounts.createUser({
            username,
            password,
        });
    },

    'update.account'(username, pic) {
        try {
            if (this.userId) {
                Meteor.users.update({_id: this.userId},{
                    $set: { 
                        username: username,
                        'profile.picture': pic
                     }
                });
                return { isError: false };
            } else {
                throw new Meteor.Error("not-logged-in", "You are not logged in");
            }
        } catch (err) {
            return { isError: true, err };
        }
    },

    'create.petition'(obj) {
        // validate: new SimpleSchema({
        //     email: { type: String, regEx: SimpleSchema.RegEx.Email },
        //     description: { type: String, min: 5 },
        //     amount: { type: String, regEx: /^\d*\.(\d\d)?$/ }
        //   }).validator()

        // new SimpleSchema({
        //     test: { type: String, min: 5, max: 120 }
        // }).validate({ test });



        try {

            if (this.userId) {
                Petitions.insert(
                    {
                        ...obj,
                        createdAt: new Date,
                        userId: this.userId
                    }
                )

                return { isError: false };
            } else {
                throw new Meteor.Error("not-logged-in", "You are not logged in");
            }
        } catch (err) {
            return { isError: true, err };
        }

        // if (!this.userId) {
        //     throw new Meteor.Error('Not authorized.');
        // }


    },
    'sign.petition'(obj) {
        // validate: new SimpleSchema({
        //     email: { type: String, regEx: SimpleSchema.RegEx.Email },
        //     description: { type: String, min: 5 },
        //     amount: { type: String, regEx: /^\d*\.(\d\d)?$/ }
        //   }).validator()

        // new SimpleSchema({
        //     test: { type: String, min: 5, max: 120 }
        // }).validate({ test });


        const petitionId = obj.petitionId;

        const totalSignatures = Signatures.find({ petitionId }).count() + 1;

        console.log({totalSignatures});

        try {

            if (!this.userId) {
                Signatures.insert(
                    {
                        ...obj,
                        createdAt: new Date,
                        userId: this.userId
                    }
                )
                Petitions.update(  
                    { _id: petitionId },
                    {
                        $set: {totalSignatures : totalSignatures}
                    }
                )

                return { isError: false };
            } else {
                Signatures.insert(
                    {
                        ...obj,
                        createdAt: new Date,
                        userId: this.userId
                    }
                )
                Petitions.update(  
                    { _id: petitionId },
                    {
                        $set: {totalSignatures : totalSignatures}
                    }
                )

                return { isError: false };
            }
        } catch (err) {
            return { isError: true, err };
        }

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }


    },
});



// const PAGE_SIZE = 100;

// Meteor.methods({
//   getItems(page) {
//     check(page, Number);
//     const skip = Math.max(page - 1, 0) * PAGE_SIZE;
//     const limit = PAGE_SIZE;
//     const sort = {createdAt: -1};

//     const cursor = Items.find({}, {skip, limit, sort});
//     return {count: cursor.count(), data: cursor.fetch()};
// });