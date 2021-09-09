import { Meteor } from "meteor/meteor";
import Petitions from "./../../lib/petitions"
import Signatures from "./../../lib/signatures"
import { check } from "meteor/check";
import Images from '/lib/dropbox.js';

Meteor.methods({

    // Image methods

    'UploadFile'(file) {
        // Using callback


        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const buffer=Buffer.from(file,'binary');

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

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

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

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

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
        const checkUsername = Meteor.users.findOne({ username });
        const isThisUsername = Meteor.users.findOne({ _id: this.userId }).username === username;
        if((!checkUsername && username.trim()) || isThisUsername) {
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
        } else {
            return { isError: true, err:{reason:"Something is wrong!"} }
        }
    },

    'create.petition'(obj) {

        const checkPetitionCount = Petitions.find({ userId: this.userId }).count();

        if (checkPetitionCount > 20) {
            return { isError: true, err:{reason:"Maximum number petititions per user is 20!"}}
        }

        const checkIfValid = obj.fields.filter((field)=> field.include && field.mandatory).length;

        if (!checkIfValid) {
            return { isError: true, err:{reason:"You must check at least one petiton signing field that is mandatory!"}}
        }

        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = obj.video ? obj.video.match(regExp) : '';

        if(obj.video && !match) {
            return { isError: true, err:{reason:"Please enter proper YouTube link or leave it blank!"}}
        } else if(obj.video && match) {
            obj = {...obj, video: match[2]}
        }



        try {

            if (this.userId) {
                const newPetition = Petitions.insert(
                    {
                        ...obj,
                        createdAt: new Date,
                        userId: this.userId
                    }
                )

                return { isError: false, newPetition };
            } else {
                throw new Meteor.Error("not-logged-in", "You are not logged in");
            }
        } catch (err) {
            return { isError: true, err };
        }

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }


    },

    'delete.petition'(petitionId) {

        const checkPetition = Petitions.find({_id: petitionId, userId: this.userId}).count();

        if (checkPetition!==1) {
            return { isError: true, err: {reason: 'Not authorized.'} };
            throw new Meteor.Error('Not authorized.');
        }

        try {
            if (this.userId) {
                Petitions.remove({_id: petitionId, userId: this.userId})
                return { isError: false };
            } else {
                throw new Meteor.Error("not-logged-in", "You are not logged in");
            }
        } catch (err) {
            return { isError: true, err };
        }

    },

    'change.milestone'(petitionId, newMilestone) {

        const checkPetition = Petitions.find({_id: petitionId, userId: this.userId}).count();

        if (checkPetition!==1) {
            return { isError: true, err: {reason: 'Not authorized.'} };
            throw new Meteor.Error('Not authorized.');
        }

        try {
            if (this.userId) {
                Petitions.update(
                    {_id: petitionId, userId: this.userId},
                    {
                        $set: {milestone : newMilestone}
                    }
                    )
                return { isError: false };
            } else {
                throw new Meteor.Error("not-logged-in", "You are not logged in");
            }
        } catch (err) {
            return { isError: true, err };
        }

    },

    'sign.petition'(obj) {

        const petitionId = obj.petitionId;

        const totalSignatures = Signatures.find({ petitionId }).count() + 1;

        console.log({totalSignatures});

        try {

            Signatures.insert(
                {
                    ...obj,
                    createdAt: new Date,
                    userId: this.userId || ""
                }
            )
            Petitions.update(  
                { _id: petitionId },
                {
                    $set: {totalSignatures : totalSignatures}
                }
            )

            return { isError: false };
            
        } catch (err) {
            return { isError: true, err };
        }
    },
});