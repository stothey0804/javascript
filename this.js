// this 는 함수를 호출할 때 결정 된다!

// 1. 상황에 따라 달라지는 this
// 1-1. 전역 공간에서의  this

// 브라우저 환경에서 전역객체 : window, Node.js 환경에서 전역객체 : global


// 1-2. 메서드 호출 시 메서드 내부에서 this
// 함수와 메서드 : 독립성의 차이, 함수는 자체로 독립적 기능 수행, 메서드는 호출한 객체에 관련된 동작을 수행.
// 자바스크립트에서는 객체의 메서드로서 호출할 경우에 메서드로 동작하고, 아니면 함수로 동작

var func = function(x){
    console.log(this, x);
};
func(1); // Window { ... } 1

var obj = {
    method: func
};
obj.method(2); // { method: f } 2


var obj = {
    methodA: function() { console.log(this); },
    inner: {
        methodB: function() { console.log(this); }
    }
};

obj.methodA(); // obj
obj.inner.methodB(); // obj.inner


// 1-3. 함수로서 호출할 때 함수 내부에서의 this
// 함수를 함수로서 호출할 때는 this가 지정되지 않음. 함수에서의 this는 전역객체를 가리킴.

// 메서드 내부에서 this 

var obj1 = {
    outer: function(){
        console.log(this);
        var innerFunc = function(){
            console.log(this); 
        }
        innerFunc();

        var obj2 = { 
            innerMethod: innerFunc 
        };
        obj2.innerMethod();
    }
};
obj1.outer(); // obj1 -> window -> obj2
// 호출 구문 앞에 . 또는 대괄호가 있는지가 관건.

// 매서드 내부 함수에서 this를 우회하는 방법
// 직전 컨텍스트의 this를 바라보게 하고 싶을 때 우회적인 방법으로 변수를 활용

var obj = {
    outer: function(){
        console.log(this);
        var innerFunc1 = function(){
            console.log(this);
        }
        innerFunc1();

        var self = this; // _this 등으로 할당하기도.
        var innerFunc2 = function(){
            console.log(self);
        };
        innerFunc2();
    }
};
obj.outer(); // obj -> window -> obj
// 상위 스코프의 this를 저장해서 내부 함수에서 활용하려는 수단이다.


// 화살표 함수는 this를 바인딩 하지 않는다!
// 따라서 바인딩 과정이 빠지게 되어 상위 스코프의 this를 그대로 활용할 수 있다.

var obj = {
    outer: function(){
        console.log(this);
        var innerFunc = () => {
            console.log(this);
        };
        innerFunc();
    }
};
obj.outer(); // obj -> obj


// 1-4. 콜백 함수 호출 시 그 함수 내부에서 this
// 기본적으로 this가 전역객체를 참조하지만, 
// 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우 그 대상을 참조.

setTimeout(function(){ console.log(this); }, 300); // window

[1, 2, 3, 4, 5].forEach(function(x){ // window (1~5)
    console.log(this, x);
});

document.body.innerHtml += '<button id="a">click</button>';
document.body.querySelector('#a').addEventListener('click', function(e){
    console.log(this, e);   // button element
});

// 1-5. 생성자 함수 내부에서 this

// new 명령어와 함께 함수를 호출하면 함수가 생성자로서 동작하게 됨.
// 어떤 함수가 생성자 함수로서 호출된 경우 내부에서 this는 새로만들 인스턴스 자신이 된다.
// 생성자를 호출하면 생성자의 prototype 프로퍼티를 참조하는 __proto__ 가 있는 인스턴스를 만들고
// 공통 속성 및 개성을 해당객체 (this)에 부여한다.

var Cat = function(name, age){
    this.bark = 'nya~~';
    this.name = name;
    this.age = age;
};
var choco = new Cat('초코', 7); // this : choco
var nabi = new Cat('나비', 5); // this : nabi
console.log(choco, nabi);

/*
Cat {bark: "nya~~", name: "초코", age: 7}
Cat {bark: "nya~~", name: "나비", age: 5}
*/


// 2. 명시적으로 this를 바인딩 하는 방법

// 2-1. call 메서드

`Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])`

// call 메서드는 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령이다. 
// call 메서드를 이용하면 임의의 객체를 this로 지정할 수 있다.

var func = function(a, b, c){
    console.log(this, a, b, c);
}

func(1, 2, 3);  // Window { ... } 1 2 3 
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6

var obj = {
    a: 1,
    method: function(x, y){
        console.log(this.a, x, y);
    }
};

obj.method(2, 3);   // 1 2 3
obj.method.call({ a: 4 }, 5, 6);    // 4 5 6


// 2-2. apply 메서드

`Function.prototype.apply(thisArg[, argsArray])`

// apply 메서드는 call 메서드와 기능적으로 완전 동일함.
// apply는 두번째 인자를 배열로 받아 매개변수르 지정한다는 차이만 있음.

var obj = {
    a: 1,
    method: function(x, y){
        console.log(this.a, x, y);
    }
};
obj.method.apply({ a: 4 }, [5, 6]); // 4 5 6

// 2-3. call, apply 활용

// 유사배열객체(array-like object)에 배열 메서드 적용

// 객체에는 배열메서드를 직접 적용할 수 없지만, 키가 0 또는 양의 정수인 프로퍼티가 존재하고,
// length 프로퍼티의 값이 0 또는 양의 정수인 객체 = 유사배열 객체 인 경우
// call 또는 apply 메서드를 이용해 배열메서드를 사용할 수 있다.

var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
Array.prototype.push.call(obj, 'd');
// { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 }

var arr = Array.prototype.slice.call(obj);
// ['a', 'b', 'c', 'd']
// 참고 : slice는 매개변수를 아무 것도 넘기지 않을 경우 원본 배열의 얕은 복사를 한다.



// arguments, NodeList 에 배열 메서드를 적용

function a(){
    var argv = Array.prototype.slice.call(arguments);
    argv.forEach(function(arg){
        console.log(arg);
    });
}
a(1, 2, 3);  // 1 // 2 // 3

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div><div>d</div>';
var nodeList = document.querySelectorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function(node){
    console.log(node);
}); // div element // div element ... 

// 유사배열객체 외에도 문자열에도 call/apply 메서드를 이용하여 배열 메서드를 적용할 수 있다.
// 단, 문자열의 경우는 length가 읽기 전용이라 문자열을 변경하는 메서드에 에러를 던진다.

var str = 'abc def';
var newArr = Array.prototype.map.call(str, function(char){
    return char + '!';
}); // ['a!', 'b!', 'c!', '!', 'd!', 'e!', 'f!']

var newStr = Array.prototype.reduce.apply(str, [
    function(string, char, i) { return string + char + i; },
    ''
]); // "a0b1c2 3d4e5f6"

// 참고 
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce


// ES6 에서는 순회가능한 데이터타입을 배열로 전환하는 Array.from 메서드를 도입했다.


