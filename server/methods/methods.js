import Petitions from "./../../lib/petitions"
import SimpleSchema from 'simpl-schema';
import { check } from "meteor/check";


Meteor.methods({
    'tasks.insert'(test) {
        // validate: new SimpleSchema({
        //     email: { type: String, regEx: SimpleSchema.RegEx.Email },
        //     description: { type: String, min: 5 },
        //     amount: { type: String, regEx: /^\d*\.(\d\d)?$/ }
        //   }).validator()

        new SimpleSchema({
            test: { type: String, min: 5, max: 120 }
        }).validate({ test });



        try {
            if (Meteor.userId()) {

                Petitions.insert({
                    txt: test,
                    createdAt: new Date,
                    userId: this.userId,
                })

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
});