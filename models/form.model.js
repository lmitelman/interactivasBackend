const { Schema, model } = require('mongoose');

const FormSchema = Schema({
    name: {
        type: String,
        required: true
    },
    questionList: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    }
})

// Esto permite no enviar datos del Schema en la response
// en este caso, enviamos todo menos el __v.
FormSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Form', FormSchema);