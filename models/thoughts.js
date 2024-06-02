const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema(
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
        reactions: [theirReactions]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
function formatDate(value) {
    return value ? value.toLocaleString() : '';
}

const Thoughts = model('thoughts', thoughtsSchema)

module.exports = Thoughts;
