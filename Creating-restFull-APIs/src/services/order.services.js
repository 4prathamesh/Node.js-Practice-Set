// CALLBACK VERSION
exports.getUserCallback = (userId, cb) => {
    setTimeout(() => cb(null, {id: userId, name: "prathamesh"}), 500);
};

exports.getCardCallback = (user, cb) => {
    setTimeout(() => cb(null, {userId: user.id, items: ['laptop', 'Mouse'], total: 400}), 500);
};

exports.placeOrderCallback = (card, cb) => {
    setTimeout(() => cb(null, 
        {
            orderId: Math.floor(Math.random() * 1000),
            ites: card.items,
            total: card.total,
            status: "success"
        }), 500);
};

// PROMISE VERSION
exports.getUserPromise = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id: userId, name: "prathamesh"}), 500);
    });
};

exports.getCardPromise = (user) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({userId:user.id, items: ["laptop", "Mouse"], total: 4000}), 500);
    });
};

exports.placeOrderPromise = (cart) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({orderId: Math.floor(Math.random()*1000), items: cart.items, total: cart.total, status: "success"}), 500);
    });
};