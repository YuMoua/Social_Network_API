const { Schema, model } = require('mongoose');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(email) {
                    return emailRegex.test(email);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        // Need to add thoughts array with _id referencing the Thought Model
        thoughts: {

        },
        // Need to add friends array with _id referencing the User Model

        friends: {

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        // reactions:
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
function formatDate(value) {
    return value ? value.toLocalString() : '';
}

const Users = model('users', userSchema);


module.exports = Users;
