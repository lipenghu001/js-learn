// 泛型与接口

import { FunctionComponent, FC } from 'react';

interface TestProps {
  title: string;
  desc: string;
}

const Test: FunctionComponent<TestProps> = (props) => {
  // props.
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </>
  )
}

// 类型别名
let sum: (x: number, y: number) => number
const result = sum(1, 2)
type PlusType = (x: number, y: number) => number
let sum2: PlusType
sum2(1, 2)

// 交叉类型 &   把不同的类型合并起来
interface IName {
  name: string;
}
type Iperson = IName & { age: number }
let person: Iperson = {name: 'aaa', age: 3}

// 联合类型
let numberOrString: number | string;
// numberOrString.length
// numberOrString = {}

// 类型断言
function getLength(input: number | string) {
  const str = input as string
  if (str.length) {
    return str
  } else {
    const number = input as number
    return number.toString().length
  }
}



// 字符串字面量
const str = '123'
// let str2 = '123'

// Partial
interface Person {
  name: string;
  age: number;
}
type PersonOptional = Partial<Person>
let viking2: PersonOptional = { }
// Parcial原理
interface CountryResp {
  name: string;
  area: number;
  population: number;
}
type Keys = keyof CountryResp
// keyof
let key: Keys = 'area'
// lookup types
type NameType = CountryResp['name']
// mapped types
type Test = {
  [key in Keys]: any;
}
type CountryOpt = {
  [p in Keys]?: CountryResp[p]
}

// extends in generics
interface IWithLength {
  length: number;
}
function echoWithArr<T extends IWithLength>(arg: T): T {
  console.log(arg.length);
  return arg
}
const arr = echoWithArr(['1', 2, 3])
const arr1 = echoWithArr('123')
const arr2 = echoWithArr({length: 123, text: 'hello'})
// const arr3 = echoWithArr(123)

type NonType<T> = T extends null | undefined ? never : T
let demo1: NonType<number>
let demo2: NonType<undefined>

interface TestProps1 {
  title?: string;
  desc: string; 
}
const Test1: FC<TestProps1> = (props) => {
  // props.
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </>
  )
}
Test1.propTypes.title