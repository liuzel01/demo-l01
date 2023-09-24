<template>
    <!-- <slot name="btnL01" title="title-l01"></slot>
    <h1>这里是子组件</h1>
    <slot name="link"></slot> -->
    <table>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>操作</th>
        </tr>
        <tr v-for="item, index in arr2 " :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <!-- <tr v-for="item, index in arr " :key="index"> -->
            <!-- <td>{{ (item as { name: string }).name }}</td>
            <td>{{ (item as { age: number }).age }}</td> -->
            <td>
                <slot name="btns" :indexRow="index">edit</slot>
                <!-- <button>编辑</button>
                <button>删除</button> -->
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
import { UserType } from "@/types/table"
import { globalVar } from "@/types/common"

console.log(globalVar);

let props = defineProps({
    arr: {
        type: Array,
        default: []
    }
})
let arr2 = props.arr as UserType[]





</script>

<style lang="less" scoped>
table {
    border-collapse: collapse;
}

table,
th,
td {
    border: 1px solid #000;
}

th,
td {
    padding: 10px;
}
</style>
