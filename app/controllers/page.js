const User = require('../schemas/user');

const output = {
    login: (req, res) => {
        res.render('index');
    },

    main: (req, res) => {
        res.render('main');
    },

    create: (req, res) => {
        res.render('create');
    },

    update: async (req, res, next, postId) => {
        try {
            const userId = req.user.id;
            const user = await User.findById({ _id: userId }).exec();
            const post = user.board.id(postId);
            console.log(post);
            res.render('update', { post });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = {
    output,
};