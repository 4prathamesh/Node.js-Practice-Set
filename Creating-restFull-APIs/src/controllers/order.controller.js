const {
    getUserCallback,
    getCardCallback,
    placeOrderCallback,
    getUserPromise,
    getCardPromise,
    placeOrderPromise,
} = require("../services/order.services");

// CALLBACK
exports.callbackOrder = (req, res) => {
    const userId = req.params.userId;
    getUserCallback(userId, (err, user) => {
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

exports.promiseOrder = (req, res) => {
    const userId = req.params.userId;
    if(!userId) return res.status(400).json({error: "User Not found"});

    getUserPromise(userId)
        .then((user) => getCardPromise(user))
        .then((card) => placeOrderPromise(card))
        .then((order) => res.json({type: "Promise", order}))
        .catch((err) => res.status(500).json({error: err}));
};

exports.asyncOrder = async (req, res) => {
    try{

        const userId = req.params.userId;
        if(!userId) return res.status(400).json({error: "User not found"});

        const user = await getUserPromise(userId);
        const cart = await getCardPromise(user);
        const order = await placeOrderPromise(cart);

        res.json(
                {
                    message: "Order Placed Successfully",
                    type: "Async/Await",
                    user,
                    cart,
                    order,
                }
            );
    }catch (err) {
        res.status(500).json({error: err});
    }
};