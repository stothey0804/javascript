// 속성은 생성자에서 선언하고, this도 생성자에서만 설정한다.

class Validator {
    constructor() {
        this.message = '가 유효하지 않습니다.';
        this.setInvalidMessage = this.setInvalidMessage.bind(this);
    }
    setInvalidMessage(field) {
        return `${field}${this.message}`;
    }
    setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessage);
    }
}

const valid = new Validator();
console.log(valid.setInvalidMessages('도시'));
