const express = require('express'),
	authentication = require('../authentication'),
	db = require('../models/db_connector'),
	app = express(),
    _ = require('lodash');

app.post('/', function (req, resp) {
  db.Story.create(_.extend(req.body, { userId: req.user._id }))
  .then(s => resp.json(s), err => {
      console.error('Cannot create story', err);
      resp.sendStatus(500);
  });
});

app.get('/', function (req, res) {
    var filterStories = {};
    if(req.query.userId) {
        filterStories = {userId: req.query.userId};
    }
    db.Story.find(filterStories)
        .then(stories => res.json(stories), err => res.sendStatus(500));
});

app.get('/:id', function (req, res) {
    console.log('get story');
    db.Story.findOne({_id: req.params.id})
        .then(story => story || Promise.reject())
        .then(story => res.json(story), err => res.sendStatus(404));
});

app.put('/:id', function (req, res) {
    db.Story.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, req.body, {new:true})
        .then(
            updatedStory => res.json(updatedStory),
            err => {
                console.error('Cannot update story', err);
                res.sendStatus(500)
            }
        );
});

module.exports = app;