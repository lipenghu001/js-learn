//类的基本定义
// public private protected
class Animal {
  protected name: string ;
  constructor(name: string) {
    this.name = name
  }
  run() { 
    console.log('111');
    return `${this.name} is running`
  }
}
const snake = new Animal('lily')
// snake.run()
// snake.name

//继承
class Dog extends Animal {
  bark( ) {
    return `${this.name} is barking`
  }
}
const xiaobao = new Animal('xoaobao')
// xiaobao.run()
// xiaobao.bark()

// 多态
class Cat extends Animal {
  constructor(name: any) {
    super(name)
    console.log(this.name);
  }
  run() {
    return 'Meow, ' + super.run()
  }
}
const maomao = new Cat(222)
// maomao.run()

// implements
interface ClockInterface {
  currentTime: number;
  alert(): void;
}

interface ClockStaticInterface {
  new (h: number, m: number): void;
  // time: string;
}

interface GameInterface {
  play(): void;
}

const Clock: ClockStaticInterface = class Clock implements ClockInterface {
  constructor(h: number, m: number) {

  }
  static time = 12
  currentTime: number = 123;
  alert() {

  }
}

class Cellphone implements ClockInterface, GameInterface {
  currentTime: number = 456;
  alert() {

  }
  play() {

  }
}
