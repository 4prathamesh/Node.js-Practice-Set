// external imports
const { check, validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {pageTitle : 'Login', currentPage : 'login', isLoggedIn: false});
}

exports.postLogin = (req, res, next) => {
    // res.cookie('isLoggedIn', true);
    req.session.isLoggedIn = true;
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
    .matches(/^[A-Za-z]+$/)
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
        const { firstName, lastName, email, password, role } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(422).render('auth/singup', {
                pageTitle: 'SingUp',
                currentPage: 'signup',
                isLoggedIn: false,
                errorMessages: errors.array().map(err => err.msg),
                oldInput: {
                    firstName,
                    lastName,
                    email,
                    password,
                    role
                }
            });
        }
        res.redirect('/auth/login');
    }
];