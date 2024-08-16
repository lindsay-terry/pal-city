const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: new ObjectId },
        reactionBody: { type: String, required: true, maxLength: [280] },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }
);

reactionSchema
    .virtual('timestampFormat')
    .get(function () {
        return this.createdAt.toLocaleDateString('MM/DD/YYYY');
    });

