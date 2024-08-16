const router = require('express').Router();
const {
getUsers,
getSingleUser,
createNewUser,
} = require('../../controllers/userController');

// /api/users endpoint
router.route('/').get(getUsers).post(createNewUser);

router.route('/:userId').get(getSingleUser);


module.exports = router;