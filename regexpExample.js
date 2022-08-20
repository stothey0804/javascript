// 자주 사용하는 정규식 예
let regexr;

// 특정 단어 시작 검색
// 'http'로 시작하는지 검사
// ^ : 문자열의 처음을 의미한다.

const url = 'http://example.com';

regexr = /^http/;
console.log(regexr.test(url)); // true

// ========================================

// 특정 단어 끝 검색
// 확장자 검사
// $ : 문자열의 끝을 의미한다.

const fileName = 'index.html';

regexr = /html$/;
console.log(regexr.test(fileName)); // true

// ========================================

// 숫자인지 검사
// 모두 숫자인지 검사
// [^]: 부정(not)을 의미한다. 얘를 들어 [^a-z]는 알파벳 소문자로 시작하지 않는 모든 문자를 의미한다.
// [] 바깥의 ^는 문자열의 처음을 의미한다.
let targetStr = '12345';

regexr = /^\d+$/;
console.log(regexr.test(targetStr)); // true

// ========================================

// 하나 이상의 공백으로 시작하는지 검사
// \s : 여러 가지 공백 문자 (스페이스, 탭 등) => [\t\r\n\v\f]

targetStr = ' Hi!';
regexr = /^[\s]+/;
console.log(regexr.test(targetStr)); // true

// ========================================

// 아이디 허용 검사 (조건: 영문자, 숫자, 4-10자리)
// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~10자리인지 검사
// {4,10}: 4 ~ 10자리

const id = 'abc123';
regexr = /^\w{4,10}$/;
regexr = /^[A-Za-z0-9]{4,10}$/;

console.log(regexr.test(id)); // true

// ========================================

// 메일 주소 형식 검사
const email = 'ungmo2@gmail.com';
regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

console.log(regexr.test(email)); // true

// 핸드폰 번호 형식 검사
const cellphone = '010-1234-5678';
regexr = /^\d{3}-\d{3,4}-\d{4}$/;

console.log(regexr.test(cellphone)); // true

// ========================================

// 특수 문자 포함 여부 검사

targetStr = 'abc#123';

// A-Za-z0-9 이외의 문자가 있는지 검사
regexr = /[^A-Za-z0-9]/gi;
console.log(regexr.test(targetStr)); // true

// 아래 방식도 동작한다. 이 방식의 장점은 특수 문자를 선택적으로 검사할 수 있다.
regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
console.log(regexr.test(targetStr)); // true

// 특수 문자 제거
console.log(targetStr.replace(regexr, '')); // abc123
