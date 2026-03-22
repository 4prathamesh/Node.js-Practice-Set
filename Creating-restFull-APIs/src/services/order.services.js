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

