function hasUser() {
    return (req, res , next) => {
        if(req.user != undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
};

function isGuest() {
    return (req , res , next) => {
        if(req.user != undefined) {
           res.redirect('/auth/login');
        } else {
           next();
        }
    }
}

function hasRole(role) {
    return (req , res , next) => {
        if(req.user == undefined) {
            return res.redirect('/auth/login');
        }
        if(req.user.roles.includes(role) == false) {
            return res.redirect('/auth/login');
        }

        next();
    }
}

module.exports = {
    hasUser,
    isGuest,
    hasRole
}