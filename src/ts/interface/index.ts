/**
 * 不用接口时
 * @param labelledObj 
*/
// function printLabel(labelledObj: { label: string }) {
//   console.log(labelledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);

/**
 * 接口方式重写
*/
// interface LabelledValue {
//   label: string;
// }

// function printLabel(labelledObj: LabelledValue) {
//   console.log(labelledObj.label);
// }

// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);

/**
 * 可选属性
*/
// interface SquareConfig {
//   color?: string;
//   width?: number;
// }

// function createSquare(config: SquareConfig): {color: string; area: number} {
//   let newSquare = {color: "white", area: 100};
//   if (config.color) {
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }

// let mySquare = createSquare({color: "black"});

interface Person {
  name : string ;
  age ?: number ;
  readonly id?: number ;
}
let viking: Person = {
  name: 'viking',
  age: 20,
  id: 2,
}
// viking.id = 3

const sum = (x: number, y: number) => {
  return x + y
}
// 描述函数
interface ISum {
  (x: number, y: number ): number
}
const sum2 : ISum = sum

interface RandomMap {
  [propName: string]: string;
}

const test: RandomMap = {
  a: 'hello',
  b: 'test',
}
interface LikeArray {
  [index: number]: string
}

const likeArray: LikeArray = ['1', '2', '3']

// duck typing
interface FunctionWithProps {
  (x: number): number;
  name: string;
}
const a: FunctionWithProps = (x: number) => {
  return x
}
a.name = 'abc'
