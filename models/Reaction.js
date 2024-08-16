const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, maxLength: [280] },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }
);

reactionSchema
    .virtual('timestampFormat')
    .get(function () {
        return moment(this.createdAt).format('MM/DD/YYYY');
    });

module.exports = reactionSchema;