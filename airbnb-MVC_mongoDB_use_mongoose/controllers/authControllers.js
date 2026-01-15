exports.getLogin = (req, res, next) => {
    res.render('auth/login', {pageTitle : 'Login', currentPage : 'login'});
}

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    // Here you would typically validate the user credentials
    // For demonstration, we will assume the login is always successful
    req.session.isLoggedIn = true;
    req.session.user = { email: email }; // Store user info in session
    res.redirect('/'); // Redirect to home page after login
}