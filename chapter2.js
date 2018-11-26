var users = [
  { id: 1, name: 'ID', age: 36},
  { id: 2, name: 'BJ', age: 32},
  { id: 3, name: 'JM', age: 32},
  { id: 4, name: 'PJ', age: 27},
  { id: 5, name: 'HA', age: 25},
  { id: 6, name: 'JE', age: 26},
  { id: 7, name: 'JI', age: 31},
  { id: 8, name: 'MP', age: 23},
]

//array_like형태 까지도 사용하기 위해 함수형 map, filter, each를 만들어서 사용 할 필요가 있다.
//=>함수형 프로그래밍은 다형성이 높다!
/* filter */
function _filter(list, predi) {//순수함수. 기존배열 그대로. 새로운 필터링된 배열형식 만들기
    var new_list = [];
    _each(list, function(val) { if(predi(val)) new_list.push(val);});
    return new_list;
}

/* map */
function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val) {new_list.push(mapper(val));});
    return new_list;
}

/* each */
//for문을 좀 더 간결하게 보이도록 하기 위한 함수
function _each(list, iter) {
    for(var i = 0; i< list.length; i++) {
        iter(list[i]);
    }
    return list;
}

/* curry */
//인자의 적용 순서를 지정해주는 함수
function _curry(fn) {
    return function(a, b) {
        return (arguments.length == 2) ? fn(a, b) : function(b) {return fn(a, b);}
    }
}

/* curryr */
//인자를 오른쪽부터 적용할 수 있게 한다.
function _curryr(fn) {
    return function(a,b) {
        return (arguments.length == 2) ? fn(a, b) : function(b) {return fn(b, a);}
    };
}

/* _rest함수 */
//배열을 원하는 길이만큼 자른다
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

/* reduce함수 */
function _reduce(list, iter, memo) {
    //리스트의 수만큼 fn을 반복
    if(arguments.length == 2) {
        memo = list[0];
        list = _rest(list);
    }

    _each(list, function(val) {
        memo = iter(memo, val);
    });
    return memo;
}

/* 파이프 라인 */
//인자로 받은 함수를 연속적으로 실행해주는 함수
//파이프라인의 실행결과는 함수이다.
function _pipe() {
    var fns = arguments;
    return function(arg) {
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg);
    }
}

/* _go */
//즉시 실행되는 파이프 함수
function _go(arg) {
    var fns = _rest(arguments);//첫번째 넣은 값을 생략하기 위한 함수
    return _pipe.apply(null, fns)(arg);
}


//입력된 obj가 null이 아닐 때 obj의 값을 출력하는 함수
var _get = _curryr(function(obj, key) {
    return (obj == null) ? undefined : obj[key];
});

/* 명령형 코드로 작성해보기 */
//1. 30세 이상인 users를 거른다.
var temp_users = [];
for(var i = 0; i < users.length; i++) {
    if(users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log("1 : \n" + temp_users);
//2. 30세 이상인 users의 names를 거른다.
var names = [];
for(var i = 0; i < users.length; i++) {
    if(users[i].age >= 30) {
        names.push(users[i].name);
    }
}
console.log("2: " + names);
//3. 30세 미만인 users를 거른다.
var temp_users = [];
for(var i = 0; i < users.length; i++) {
    if(users[i].age < 30) {
        temp_users.push(users[i]);
    }
}
console.log("3 : \n", temp_users);
//4. 30세 미만인 users의 ages를 수집한다.
var ages = [];
for(var i = 0; i < users.length; i++) {
    if(users[i].age < 30) {
        ages.push(users[i].age);
    }
}
console.log("4 :", ages);

//_filter, _map으로 리팩토링

//30세 이상인 users를 거른다.
console.log(_filter(users, function(user){return user.age >= 30 }));
//30세 미만인 users를 거른다.
console.log(_filter(users, function(user){return user.age < 30 }));
//30세 이상인 users의 names를 거른다.
var over_30 = _filter(users, function(user){return user.age >= 30 });
console.log(_map(over_30, function(user){return user.name}));
//30세 미만인 users의 ages를 거른다.
var under_30 = _filter(users, function(user){return user.age < 30 });
console.log(_map(under_30, function(user){return user.age}));

//더 간결하게 표현하기
//30세 이상인 users의 names를 거른다.
console.log(
    _filter(users, function(user){return user.age >= 30 }),
    _map(over_30, function(user){return user.name})
);
//30세 미만인 users의 ages를 거른다.
console.log(
    _filter(users, function(user){return user.age < 30 }),
    _map(over_30, function(user){return user.age})
);

//_get을 사용하여 더 간결하게 표현하기
//30세 이상인 users의 names를 거른다.
console.log(
    _map(
        _filter(users, function(user){return user.age >= 30 }),
        _get('name')));
//30세 미만인 users의 ages를 거른다.
console.log(
    _map(
        _filter(users, function(user){return user.age < 30 }),
        _get('age')));

console.clear();

function add(a, b) {
    return a + b;
}

console.log(_reduce([1, 2, 3], add, 0));
//0부터 시작해서 1, 2, 3을 순서대로 더해라

//세번째 인자를 생략해서 reduce함수 사용하기
console.log(_reduce([1, 2, 3, 4], add));

//세번째 인자를 생략해서 reduce함수 사용하기
console.log(_reduce([1, 2, 3, 4], add, 20));

console.clear();

var f1 = _pipe(
    function(a) {return a + 1;},//2
    function(a) {return a * 2;},//4
    function(a) {return a / 4;}//1
)

console.log(f1(1));//1

_go(
    1,
    function(a) {return a + 1},//2
    function(a) {return a * 2},//4
    function(a) {return a / 2},
    console.log);//2
    //console.log자체도 함수이기 때문에 실행결과는 console.log(args) 형태로 담기게 된다.

//_go를 사용하여 코드 줄이기
//30세 이상인 users의 names를 거른다.
_go(
    users,
    function(users){return _filter(users, function(user) {return user.age >= 30})},
    function(users){return _map(users, _get('name'))},
    console.log);

var _map = _curryr(_map),
    _filter = _curryr(_filter);

_go(
    users,
    _filter(user => user.age >= 30),
    _map(_get('name')),
    console.log);
//30세 미만인 users의 ages를 거른다.
_go(
    users,
    _filter(user => user.age < 30),
    _map(_get('age')),
    console.log);

/*화살표 함수*/
var a = function(user) {return user.age > 30;};
var a = user => user.age >= 30;

//인자가 두개일 때
var add = function(a, b) {return a + b};
var add = (a, b) => a + b;

//내용이 길어질 때
var add = (a, b) => {
    //
    //
    return a + b;
};

//객체를 만들며 즉시 리턴
var add = (a, b) => ({val : a + b});
