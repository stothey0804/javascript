// 정규표현식
// https://poiemaweb.com/js-regexp

const tel = '0102345678-'
const myRegExp = /^[0-9]+$/;

console.log(myRegExp.test(tel)); // false

// 정규표현식 리터럴
// /regexp/i = /패턴/플래그

let targetStr = 'This is a pen.';
let regexr = /is/ig;

// RegExp 객체의 메소드
console.log(regexr.exec(targetStr)); // [ 'is', index: 2, input: 'This is a pen.' ]
console.log(regexr.test(targetStr)); // true

// String 객체의 메소드
console.log(targetStr.match(regexr)); // [ 'is', 'is' ]
console.log(targetStr.replace(regexr, 'IS')); // ThIS IS a pen.
// String.prototype.search는 검색된 문자열의 첫번째 인덱스를 반환한다.
console.log(targetStr.search(regexr)); // 2 ← index
console.log(targetStr.split(regexr));  // [ 'Th', ' ', ' a pen.' ]

// =======================================================
// 플래그
// i = 대소문자 구분하지 않음
// g = 문자열 내 모든 패턴 검색
// m = 문자열 행이 바뀌어도 검색
// 플래그가 없는 경우 첫번째 매칭 대상만 검색 하고 끝난다.

targetStr = 'Is this all there is?';

// 문자열 is를 대소문자를 구별하여 한번만 검색한다.
regexr = /is/;
console.log(targetStr.match(regexr)); // [ 'is', index: 5, input: 'Is this all there is?' ]

// 문자열 is를 대소문자를 구별하지 않고 대상 문자열 끝까지 검색한다.
regexr = /is/ig;
console.log(targetStr.match(regexr)); // [ 'Is', 'is', 'is' ]
console.log(targetStr.match(regexr).length); // 3

// =======================================================
// 패턴
// . = 임의의 문자 하나
// + = 앞선 패턴의 반복
// | = or

targetStr = 'AA AAA BB Aa Bb';
// 'A'가 한번이상 반복되는 문자열('A', 'AA', 'AAA', ...)을 반복 검색
regexr = /A+/g;
console.log(targetStr.match(regexr)); // [ 'AA', 'AAA', 'A' ]

targetStr = 'AA BB Aa Bb';
// 'A' 또는 'B'를 반복 검색
regexr = /A|B/g;
console.log(targetStr.match(regexr)); // [ 'A', 'A', 'B', 'B', 'A', 'B' ]

// =======================================================

// 분해되지 않은 단어 레벨 추출하기

targetStr = 'AA AAA BB Aa Bb';

// 'A' 또는 'B'가 한번 이상 반복되는 문자열을 반복 검색
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
regexr = /A+|B+/g;
regexr = /[AB]+/g;
// 위 두 식은 동일한 정규식 표현이다.

console.log(targetStr.match(regexr)); // [ 'AA', 'AAA', 'BB', 'A', 'B' ]

// 범위 지정
// 'A' ~ 'Z'가 한번 이상 반복되는 문자열을 반복 검색
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ... ~ 또는 'Z', 'ZZ', 'ZZZ', ...

targetStr = 'AA BB ZZ Aa Bb';
regexr = /[A-Z]+/g;

console.log(targetStr.match(regexr));  // [ 'AA', 'BB', 'ZZ', 'A', 'B' ]

// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[A-Za-z]+/g;
// 아래와 동일하다.
// regexr = /[A-Z]+/gi;

// =======================================================

// 숫자 추출하기
// '0' ~ '9'가 한번 이상 반복되는 문자열을 반복 검색

targetStr = 'AA BB Aa Bb 24,000';
regexr = /[0-9]+/g;

console.log(targetStr.match(regexr)); // [ '24', '000' ]

// 컴마를 포함하고 싶을 경우 패턴에 넣어준다.
regexr = /[0-9,]+/g;
console.log(targetStr.match(regexr)); // ['24,000']

// 간단한 표현 
// \d 는 숫자를 표현함 <-> \D 는 숫자가 아닌 경우!

// '0' ~ '9' 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\d,]+/g;
console.log(targetStr.match(regexr)); // [ '24,000' ]

// '0' ~ '9' 가 아니거나 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\D,]/g;
console.log(targetStr.match(regexr)); // [ 'AA BB Aa Bb', ',' ]

// \w 는 알파벳 + 숫자, <-> \W
regexr = /[\w,]+/g;
console.log(targetStr.match(regexr)); // [ 'AA', 'BB', 'Aa', 'Bb', '24,000' ]

regexr = /[\W,]+/g;
console.log(targetStr.match(regexr)); // [ ' ', ' ', ' ', ' ', ',']
