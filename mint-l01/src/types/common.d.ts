/* 全局变量的声明文件主要有以下几种语法： 
declare var 声明全局变量
declare function 全局方法
declare class 全局类
declare enum 全局枚举类型
declare namespace （含有某种方法的）全局对象
interface  type 全局类型
*/

// 类型增强
export declare var globalVar: string

// 接口、类型别名
type objType = { name: string, agE: number }
export declare var globalObj: objType

declare function fn(s?: string): void