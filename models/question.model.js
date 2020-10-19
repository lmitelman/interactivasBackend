const { Schema, model } = require('mongoose');

const QuestionSchema = Schema({
    question: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        required: true
    },
    sectors: [{
        type: String,
        required: true
    }],
    options: {
        type: Array
    },
    referenceSmallBusiness: {
        type: String
    },
    referenceMediumBusiness: {
        type: String
    }
})

// Esto permite no enviar datos del Schema en la response
// en este caso, enviamos todo menos el __v.
QuestionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Question', QuestionSchema);