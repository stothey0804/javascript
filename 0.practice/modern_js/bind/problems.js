class Validator {
    constructor() {
        this.message = '가 유효하지 않습니다.';
        // this.setInvalidMessage = (field) => `${field}${this.message}`;
        // property로 메서드를 설정해서 여기저기 정의될 뿐더러, 생성자가 비대해짐
    }
    // setInvalidMessage(field) {
    //     return `${field}${this.message}`;
    // }
    setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessage);
    }
}

const valid = new Validator();
console.log(valid.setInvalidMessages('도시'));
// 배열 문맥으로 읽어들임. 