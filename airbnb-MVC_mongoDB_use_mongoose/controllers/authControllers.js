exports.getLogin = (req, res, next) => {
    res.render('auth/login', {pageTitle : 'Login', currentPage : 'login', isLoggedIn: false});
}

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    // Here you would typically validate the user credentials
    // For demonstration, we will assume the login is always successful
    res.cookie('isLoggedIn', true);
    // req.isLoggedIn = true;
    res.redirect('/'); // Redirect to home page after login
}

exports.postLogout = (req, res, next) => {
    res.clearCookie('isLoggedIn');
    res.redirect('/auth/login'); // Redirect to home page after logout
}