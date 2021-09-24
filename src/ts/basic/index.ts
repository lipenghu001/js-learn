let isDone: boolean = false
let age: number = 10

let firstName : string = 'viking' 
let message: string = `Hello, ${firstName}`

// 这俩是所有其他类型的子类型
let u: undefined = undefined
let n: null = null

let num: string = undefined

// 尽量不定义为any
let notSure: any = 4
notSure = 'maybe a string'
notSure = true

notSure.myName
notSure.getName()


// array 
let arrOfNumbers: number[] = [1, 2, 3, 4] 
arrOfNumbers.push(3)

// tuple
let user : [string, number] = ['viking', 20]

// function
function add( x: number, y: number, z?: number ): number {
  return x + y
}

let result = add(2, 3, 5)

let add2 = (x: number, y: number ): number => {
  return x + y 
}

const add3: (x: number, y: number ) => number = add2

// type inference
let str = 'str'
// str = 1