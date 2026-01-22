// external imports
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// internal imports
const User = require('../Models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {pageTitle : 'Login', currentPage : 'login', isLoggedIn: false, errorMessages : [],
    oldInput : {
        email: '',
        password: ''
    }});
}

exports.postLogin = async (req, res, next) => {
    // res.cookie('isLoggedIn', true);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            currentPage: 'login',
            isLoggedIn: false,
            errorMessages: ["User doesn't exist"],
            oldInput: {
                email: email,
                password: ''
            }
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(422).render('auth/login', {
            pageTitle: 'Login',
            currentPage: 'login',
            isLoggedIn: false,
            errorMessages: ["Invalid credentials"],
            oldInput: {
                email: '',
                password: ''
            }
        });
    } 
        
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect('/');
}

exports.postLogout = (req, res, next) => {
    // res.clearCookie('isLoggedIn');
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
    
}

exports.getSingup = (req, res, next) => {
    res.render(
        'auth/singup',
        {pageTitle : 'SingUp', currentPage : 'signup', isLoggedIn: false, errorMessages : [],
        oldInput : {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            terms: ''
        }}
    );
}

exports.postSingup = [ 
    check("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 2 })
    .withMessage("First Name must be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name must contain only letters"),

    check("lastName")
    .matches(/^[A-Za-z]*$/)
    .withMessage("Last Name must contain only letters"),

    check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

    check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

    check("confirmPassword")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),     

    check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["host", "guest"])
    .withMessage("Role must be either 'host' or 'guest'"),

    check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),

    (req, res, next) => {
        const { firstName, lastName, email, password, role, terms } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(422).render('auth/singup', {
                pageTitle: 'SingUp',
                currentPage: 'signup',
                isLoggedIn: false,
                errorMessages: ["User doesn't exist"],
                oldInput: {
                    email,
                }
            });
        }

        bcrypt.hash(password, 12).then( hashedPassword => {

        user = new User({ firstName, lastName , email, password: hashedPassword, role, terms: true });
        return user.save();
        }).then(()=>{
            res.redirect('/auth/login');
        }).catch( err => {
            return res.status(422).render('auth/singup', {
                pageTitle: 'SingUp',
                currentPage: 'signup',
                isLoggedIn: false,
                errorMessages: [err.message],
                oldInput: {
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                    terms
                }
            });
        });
    }
];