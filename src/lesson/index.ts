import '@/lesson/type'


let name1: unknown = '123'
name1 = 999

let name2: unknown = '123123'
let name3 = name2 as boolean | string

// 断言的应用
async function getData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json() as { userId: number, id: number, title: string, completed: boolean }
    console.log(data.completed);
}

const ar7: (string | boolean)[] = []
ar7.push(false)

// interface 

interface UserCard {
    name: string
    age: number
    desc: string
}

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

function get(a: number, b: string, c: boolean) {
    return a + b
}
get(11, '123', true)

function setUser(name: string, age?: string) {
    return age?.split('')

}