const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minLength: [1], maxLength: [280] },
        createdAt: { type: Date, default: Date.now },
        username: { type: String, required: true },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format('MM/DD/YYYY');
});

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

    const Thought = model('thought', thoughtSchema);
    
    module.exports = Thought;