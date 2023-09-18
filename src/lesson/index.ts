import '@/lesson/type'
import { type } from 'os'


// let name1: unknown = '123'
// name1 = 999

// let name2: unknown = '123123'
// let name3 = name2 as boolean | string

// // 断言的应用
// async function getData() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//     const data = await res.json() as { userId: number, id: number, title: string, completed: boolean }
//     console.log(data.completed);
// }

// const ar7: (string | boolean)[] = []
// ar7.push(false)

// interface 

// interface UserCard {
//     name: string
//     age: number
//     desc: string
// }

// type Ani = {
//     name: string
//     age: number
// }
// type Dog = Ani & {
//     height: string
// }
// const a1: Dog = {
//     name: 'a1',
//     age: 123,
//     height: '123'
// }

// function get(a: number, b: string, c: boolean) {
//     return a + b
// }
// get(11, '123', true)

// 可选的参数
// function setUser(name: string, age?: string) {
//     if (typeof age === 'string') {
//         return age?.split('')
//     }
// }

// // return type 
// function getNum() {
//     return 100
// }
// function getName(): string {
//     return ''
// }

// // type 
// type Info = {
//     name: string,
//     age: number
// }
// function createUserInfo(info: Info) {
//     console.log(info.name);
//     return info
// }

// // never 
// function getUserData(): never {
//     throw new Error('...')
// }

// // void
// function hello() {
//     console.log();
// }

// // 构建函数
// type CardObj = {
//     name: string
// }
// type CardCreator = {
//     new(name: string): CardObj
// }
// function createCard(cardCreator: CardCreator) {
//     return new cardCreator('l01')
// }

// // return [],避免 union 情况的发生
// function getArr() {
//     // return [0,1,'liuzel01'] as const
//     return [0, 1, 'liuzel01'] as [number, number, string]
// }
// const [id, age, userName] = getArr()

// // T -> type
// function print<T>(data: T) {
//     console.log(data);
// }
// print<string>('123')
// print<number>(1223)

// overload 重载
// 多个一样名称的 func


function getData(data: unknown): unknown {
    // function getData(data: string | number) {
    console.log();
    if (typeof data === 'string') return []
    if (typeof data === 'number') return 123

    return false
}
getData(99)