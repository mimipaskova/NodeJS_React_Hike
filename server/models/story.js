var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var storiesSchema = new Schema({
	title: {type: String, required: true},
	loc: {
		type: { type: String },
		coordinates: []
	},
	description: String,
  userId: Schema.Types.ObjectId,
  createdDate: { type: Date, default: Date.now },
  picture: {type: String}
});

var Story = mongoose.model('story', storiesSchema, 'stories');

module.exports = Story;