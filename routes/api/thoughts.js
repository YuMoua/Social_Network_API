const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought
} = require('../../controllers/thoughtsController')


router.route('/').get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

// router.route('/:thoughtId/reaction').post(addReaction);

// router.route('/:thoughtId/reaction/:reactionId').delete(addReaction);
