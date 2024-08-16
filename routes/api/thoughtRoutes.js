const router = require('express').Router();
const {
getThoughts,
getSingleThought,
newThought,
} = require('../../controllers/thoughtController');

// /api/thoughts endpoint to get all thoughts
router.route('/').get(getThoughts).post(newThought);

// /api/thoughts/:thoughtId to get single thought
router.route('/:thoughtId').get(getSingleThought);
module.exports = router;