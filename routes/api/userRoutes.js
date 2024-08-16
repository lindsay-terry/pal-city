const router = require('express').Router();
const {
getUsers,
getSingleUser,
createNewUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} = require('../../controllers/userController');

// /api/users endpoint to get all users and create new user
router.route('/').get(getUsers).post(createNewUser);

// /api/users/:userId endpoint to get single user and update user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId endpoint to add and delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;