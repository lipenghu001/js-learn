// 1. Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
// 2. Promise 会有三种状态
//  a. Pending 等待
//  b. Fulfilled 完成
//  c. Rejected 失败

// 3. 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
// 4. Promise 中使用 resolve 和 reject 两个函数来更改状态；
// 5. then 方法内部做的事情就是状态判断
//   a.如果状态是成功，调用成功回调函数
//   b.如果状态是失败，调用失败回调函数

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error)
    }
  }

  status = PENDING;
  // 成功之后的值
  successValue = null;
  // 失败之后的原因
  errMessage = null;


  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.successValue = value;
      // 判断成功回调是否存在，如果存在就调用
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (message) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = REJECTED;
      // 保存成功之后的值
      this.errMessage = message;
      // 判断失败回调是否存在，如果存在就调用
      // this.onRejectedCallback && this.onRejectedCallback(message)
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(message)
      }
    }
  }

  // 存储成功回调函数
  onFulfilledCallback = null;
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallback = null;
  onRejectedCallbacks = [];

  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    // 判断状态
    // if (this.status === FULFILLED) {
    //   // 调用成功回调，并且把值返回
    //   onFulfilled(this.successValue);
    // } else if (this.status === REJECTED) {
    //   // 调用失败回调，并且把原因返回
    //   onRejected(this.errMessage);
    // } else if (this.status === PENDING) {
    //   // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
    //   // 等到执行成功失败函数的时候再传递
    //   // this.onFulfilledCallback = onFulfilled;
    //   // this.onRejectedCallback = onRejected;
    //   this.onFulfilledCallbacks.push(onFulfilled);
    //   this.onRejectedCallbacks.push(onRejected);
    // }
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.successValue);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })  
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.errMessage);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.successValue);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          }) 
        });
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.errMessage);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          }) 
        });
      }
    }) 
    
    return promise2;
  }

  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise

// const promise = new MyPromise((func1, func2) => {
//   console.log('promise run')
//   func1()
// })