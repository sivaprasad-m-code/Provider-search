const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String, required: true },
  therapyType: {
    type: String,
    enum: ['In-Clinic', 'In-Home', 'Virtual'],
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  services: {
    type: [String],
  }
});

//created compound index
providerSchema.index({ address:1, therapyType: 1, services: 1 },{ name: 'provider_search_idx' });

module.exports = mongoose.model("Provider", providerSchema);
