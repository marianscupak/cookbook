const router = require('express').Router();
const User = require('../models/User');
const UserSession = require('../models/UserSession');

router.route('/signup').post((req, res) => {
    const { body } = req;
    const {
        username,
        email,
        password
    } = body;

    if (!username) {
        return res.send({
            success: false,
            message: "Error: Username cannot be blank."
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: "Error: E-mail cannot be blank."
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: "Error: Password cannot be blank."
        });
    }

    User.find({
        username: username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error."
            });
        }
        else if (users.length > 0) {
            return res.send({
                success: false,
                message: "Error: Account with that username already exists."
            });
        }

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server error."
                });
            }
            else if (users.length > 0) {
                return res.send({
                    success: false,
                    message: "Error: Account with that e-mail already exists."
                });
            }
            const newUser = new User();

            newUser.username = username;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
        
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server error."
                    });
                }
        
                const newUserSession = new UserSession();
                newUserSession.userId = user._id;
        
                newUserSession.save((err, doc) => {
                    if (!err) {
                        return res.send({
                            success: true,
                            message: "Registration successful.",
                            user: newUser,
                            token: doc._id
                        })
                    }
                    else {
                        return res.send({
                            success: false,
                            message: "Error: Server error."
                        })
                    }
                });
            });
        });
    });    
});

router.route('/login').post((req, res) => {
    const { body } = req;
    const {
        username,
        password
    } = body;

    if (!username) {
        return res.send({
            success: false,
            message: "Error: Username cannot be blank."
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: "Error: Password cannot be blank."
        });
    }

    User.find({
        username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error."
            });
        }
        else if (users.length === 0) {
            return res.send({
                success: false,
                message: "Error: Invalid credentials."
            });
        }
        
        const user = users[0];

        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Error: Invalid credentials."
            });
        }
        
        let userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server error."
                });
            }
            return res.send({
                success: true,
                message: "Login successful.",
                token: doc._id,
                userEmail: user.email
            });
        });
    });
});

router.route('/verify').get((req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error."
            });
        }
        if (sessions.length !== 1) {
            return res.send({
                success: false,
                message: "Error: Invalid."
            });
        }
        User.find({
          _id: sessions[0].userId
        }, (err, users) => {
          return res.send({
            success: true,
            user: {
              username: users[0].username,
              email: users[0].email,
              id: users[0]._id
            },
            message: "Verified."
          });
        });
    });
});

router.route('/logout').get((req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOne({
        _id: token,
        isDeleted: false
    }, (err, session) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error."
            });
        }
        
        session.isDeleted = true;
        session.save();

        return res.send({
            success: true,
            message: "Logged out."
        });
    });
});

module.exports = router;