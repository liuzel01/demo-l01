// interface OBJ {
//     name: string
// }
// const obj: OBJ = { name: '' }

// interface UserInterface {
//     id: number,
//     name: string,
//     age: number,
//     address: string
//     // 会员功能
//     add: (data: any) => void
//     update: (id: number) => boolean
//     delete: (id: number) => boolean
// }

// class LiveUser implements UserInterface {
//     id: number
//     name: string
//     age: number
//     address: string
//     add(data: any) { }
//     update(id, number) {
//         return true
//     }
//     delete(id: number) {
//         return true
//     }
//     startLive() { }
//     endLive() { }
// }


// TS 成员类型（公开、私有、受保护的）
// 修饰词 public private protected

// class UserInformation {
//     private name: string = 'liuzel01'
//     getName() {
//         return this.name
//     }
// }
// class StreamerInformation extends UserInformation {

// }
// const sInfo = new StreamerInformation();
// console.log(sInfo.getName);

// // JS 原生私有成员写法（2020新功能）
// class UserInformation {
//     #name: string = 'liuzel01'
//     getName() {
//         return this.#name
//     }
// }
// const u = new UserInformation()
// console.log(u.getName);

// static 静态（可以被共用的东西）
// class Bank {
//     private static balance: number = 1000
//     static withdraw(money: number) {
//         if (this.balance <= 0) return
//         this.balance -= money
//     }
//     static getBalance() {
//         return this.balance
//     }
// }
// // console.log(Bank.balance);
// function userAWithdraw(money: number) {
//     Bank.withdraw(money)
//     console.log(Bank.getBalance());
// }
// userAWithdraw(200)
// // function userBWithdraw(money: number) {
// //     Bank.withdraw(money)
// //     console.log(Bank.getBalance());
// // }


// this js 
class CarInfo {
    title: string = 'liuzel01'
    constructor() {
        this.title = ''
    }
    hello() {
        // TODO del 
        console.log('this.title', this.title);
    }
}
const cc = new CarInfo()
// 真正执行的地方
// this = carInfo 
cc.hello()

