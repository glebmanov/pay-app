const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  CardNumber: { type: String, required: true },
  ExpDate: { type: String, required: true },
  Cvv: { type: String, required: true },
  Amount: { type: String, required: true },
  id: { type: Types.ObjectId },
});

module.exports = model('Payment', schema);
