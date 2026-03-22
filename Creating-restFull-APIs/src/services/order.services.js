// CALLBACK VERSION
exports.getUserCallback = (userId, cb) => {
    setTimeout(() => cb(null, {id: userId, name: "prathamesh"}), 500);
};

exports.getCardCallback = (user, cb) => {
    setTimeout(() => cb(null, {item: ['laptop', 'Mouse']}), 500);
};

exports.placeOrderCallback = (card, cb) => {
    setTimeout(() => cb(null, {orderId: 1, status: "success"}), 500);
};

// PROMISE VERSION
exports.getUserPromise = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id: userId, name: "prathamesh"}), 500);
    });
};

exports.getCardPromise = (user) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({item: ["laptop", "Mouse"]}), 500);
    });
};

exports.placeOrderPromise = (order) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({orderId: 2, status: "success"}), 500);
    });
};