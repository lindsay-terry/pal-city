const router = require('express').Router();
const {
getThoughts,
getSingleThought,
newThought,
updateThought,
deleteThought,
createReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts endpoint to get all thoughts
router.route('/').get(getThoughts).post(newThought);

// /api/thoughts/:thoughtId to get single thought, update a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);
module.exports = router;