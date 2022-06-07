function sayMessage() {
    return this.message;
}

const alert = {
    message: '위험!'
};

const sayAlert = sayMessage.bind(alert);
sayAlert(); // '위험!'