const {
    getUserCallback,
    getCardCallback,
    placeOrderCallback,

} = require("../services/order.services");

// CALLBACK
exports.callbackOrder = (req, res) => {
    getUserCallback(1, (err, user) => {
        if(err) return res.status(500).json({error: err});

        getCardCallback(user, (err, card) => {
            if(err) return res.status(500).json({error: err});

            placeOrderCallback(card, (err, order) => {
                if(err) return res.status(500).json({error: err});

                res.json({type: "callBack", order});
            })
        })
    })
};