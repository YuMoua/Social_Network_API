const { Schema, Types } = require('mongoose');

// need to work on these possible reactions array
const possibleReactions = [

]

const reactions = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
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

module.exports = reactions;
