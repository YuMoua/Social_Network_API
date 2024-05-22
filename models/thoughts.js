const { Schema, Types } = require('mongoose');

const thoughts = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            comments: [theirReactions]
        }
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
module.exports = thoughts;
