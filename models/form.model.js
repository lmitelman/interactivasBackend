const { Schema, model } = require('mongoose');

const QuestionSchema = Schema({ 
    question: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['Text', 'Multiple choice'],
        required: true
    },
    options: [{
        type: String
    }],
    referenceSmallBusiness: {
        type: String
    },
    referenceMediumBusiness: {
        type: String
    }
});

const FormSchema = Schema({
    name: {
        type: String,
        required: true
    },
    sector: String,
    questionList: [ QuestionSchema ]
})

// Esto permite no enviar datos del Schema en la response
// en este caso, enviamos todo menos el __v.
FormSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Form', FormSchema);