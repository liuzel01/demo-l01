// 除非 .tsconfigjson 中做了全局配置，不然都需要 export，才能在其他文件中 import 类型，和使用
// 做了全局配置，可以不用 import，直接使用定义的类型

interface DataTypes {
    list: number[];
    checkList: boolean[]
}