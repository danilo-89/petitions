import { Meteor } from 'meteor/meteor';
// IMPORT PUBLICATIONS
import './pubs/petitionsPublications'
// IMPORT METHODS
import './methods/methods';
const checkUNRegex = /^(\d|\w)+$/;

Accounts.validateNewUser((user) => {
    if (user.username && user.username.length >= 3 && user.username.length <= 20 && checkUNRegex.test(user.username)) {
        return true;
    } else if (checkUNRegex.test(user.username) === false) {
        throw new Meteor.Error(403, 'Username can only consist of letters, numbers and underscores');
    } else {
        throw new Meteor.Error(403, 'Username must be between 3 and 20 characters');
    }
});

// Define a rule that matches login attempts
const loginRule = {
    userId(userId) {
        const user = Meteor.users.findOne(userId);
        return user;
    },

    type: 'method',
    name: 'login'
};

// Add the rule, allowing up to 5 messages every 1000 milliseconds.
DDPRateLimiter.addRule(loginRule, 5, 5000);
