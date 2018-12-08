/* 순수함수 */
/*
부수효과가 없는 수학적 함수
들어온 인자가 같으면 항상 동일한 결과
함수가 받은 인자 외의 다른 상태에 영향을 끼치지 않는 함수
리턴값 외에는 외부와 소통하지 않는다.
평가시점이 중요하지 않다.
*/

//순수함수
console.log("-----순수함수------");
function add(a, b) {
    return a + b;
}
console.log(add(10, 5));
console.log(add(10, 5));
//동일한 인자, 동일한 결과, 부수효과 x

console.log("-------동일한 인자, 다른 결과(순수함수 x)--------");
var c = 10;
function add3(a,b) {
  c = b;
  return a + b ;
}
console.log("c : ", c);
console.log(add3(10,5));
console.log("c : ", c);
console.log(add3(10,5));

console.log("-------부수효과 발생2(순수함수 x)--------")
var obj1 = {val: 10};
function add4(obj, b) {
  obj.val += b;
}
console.log(obj1.val);
add4(obj1,20);
console.log(obj1.val);

/* 함수형 프로그래밍에서는 원래의 값은 그대로 두고 새로운 값을 변형시킴. */
console.log("------순수함수로 객체사용하기------");
var obj1 = {val: 10}
function add5(obj, b) {
  return {val : obj1.val + b};
}

console.log("obj1 :" + obj1.val);
var obj2 = add5(obj1, 10);
console.log("obj1 :" + obj1.val);
console.log("obj2 :" + obj2.val);

/* 일급함수 */
//함수를 값(인자)으로 다룰 수 있다
var f1 = function(a) { return a + a ; };
console.log(f1);
var f2 = add;
console.log(f2);
function f3(f) {return f()};
console.log(f3(function(){return 10;}));
