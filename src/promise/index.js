const MyPromise =  require('./MyPromise')
const MyPromiseFinal = require('./MyPromiseFinal')

// Promise是异步操作的一种解决方案

// Promise/A+并未规范race、all、catch方法，这些是ES6自己规范的

async function parent() {
  console.log('start');
  try {
    let res = await child()
    console.log('res :>> ', res);
  } catch (err) {
    console.log('err :>> ', err);
  }
  console.log('end');
}

function child() {
  return new Promise(function(resolve, reject) {
    resolve(2)
    reject(3)
    console.log(1);
  })
  // .then(function(a) {
  //   console.log('a :>> ', a);
  //   console.log(4);
  // }).catch(function(b){
  //   console.log('b :>> ', b);
  // })
}

// parent()

// Promise.resolve().then(() => {
//   console.log(0);
//   return Promise.resolve(4);
// }).then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })


// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
//   // setTimeout(() => {
//   //   resolve('success')
//   //   reject('err')
//   // }, 2000);
// })

// function other () {
//   return new MyPromise((resolve, reject) =>{
//     resolve('other')
//   })
// }

// const p1 = promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return p1
// })

// 运行的时候会走reject
// p1.then(value => {
//  console.log(2)
//  console.log('resolve', value)
// }, reason => {
//  console.log(3)
//  console.log(reason.message)
// })


// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return other()
// }).then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// const promise1 = new MyPromise((resolve, reject) => {
//   resolve(100)
// })
// const p1 = promise1.then(value => {
//   console.log(value)
//   return p1
// })


// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// })

// promise.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// promise.then(value => {
//   console.log(3)
//   console.log('resolve', value)
// })

// const promise = new MyPromise((resolve, reject) => {
//   // resolve('success')
//   throw new Error('执行器错误')
// })

// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// })

// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
//   // throw new Error('执行器错误')
// })

// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   throw new Error('then error')
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// }).then(value => {
//   console.log(3)
//   console.log(value);
// }, reason => {
//   console.log(4)
//   console.log(reason.message)
// })

// const promise = new MyPromise((resolve, reject) => {
//   resolve('succ')
// })
 
// promise.then().then().then(value => console.log(value))

// const promise = new MyPromise((resolve, reject) => {
//   reject('err')
// })
 
// promise.then().then().then(value => console.log(value), reason => console.log(reason))

// MyPromise.resolve().then(() => {
//   console.log(0);
//   return MyPromise.resolve(4);
// }).then((res) => {
//   console.log(res)
// })

console.log('end');
// promise.then(value => {
//  console.log('resolve', value)
// }, reason => {
//  console.log('reject', reason)
// })
// .catch((err) => {
//   console.log('err :>> ', err);
// })

// 输出 resolve success
