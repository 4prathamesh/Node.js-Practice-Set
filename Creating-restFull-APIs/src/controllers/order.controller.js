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

exports.promiseOrder = (req, res) => {
    getUserPromise(2)
        .then((user) => getCardPromise(user))
        .then((card) => placeOrderPromise(card))
        .then((order) => res.json({type: "Promise", order}))
        .catch((err) => res.status(500).json({error: err}));
};

exports.asyncOrder = async (req, res) => {
    try{
        const user = await getUserPromise(3);
        const card = await getCardPromise(user);
        const order = await placeOrderPromise(card);

        res.json({type: "Async/Await", order});
    }catch (err) {
        res.status(500).json({error: err});
    }
};