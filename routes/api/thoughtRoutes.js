const router = require('express').Router();
const {
getThoughts,
getSingleThought,
newThought,
updateThought,
deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts endpoint to get all thoughts
router.route('/').get(getThoughts).post(newThought);

// /api/thoughts/:thoughtId to get single thought, update a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
module.exports = router;