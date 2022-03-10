<template>
  <div class="home">
    <div>
      id:
      <input type="text" v-model="state.id">
      <button @click="handleSelect">查找</button>
      <button @click="handleFuSelectData">模糊查询</button>
      <div v-if="state.result1.nickname">
        {{state.result1.nickname}}{{state.result1.time}}
      </div>
    </div>
    <div>
      id:
      <input type="text" v-model="state.nickId">
      nickname:
      <input type="text" v-model="state.nickname">
      <button @click="handleInsertData">插入</button>
      <button @click="handleChangeData">修改</button>
      <button @click="handleDeleteData">删除</button>
      <button @click="handleClearTable">清空</button>
    </div>
    <button @click="readAll">获取全部</button>
  </div>
</template>

<script>
// @ is an alias to /src
import IndexDB from "../common/indexDB";
import { reactive } from "vue";
export default {
  name: "HomeView",
  setup() {
    // 初始化数据库
    const state = reactive({
      id: "",
      nickId: "",
      nickname: "",
      result1: {},
      result2: {},
    });
    const dateformat = () => {
      const date = new Date();
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        "-" +
        date.getMinutes() +
        "-" +
        date.getSeconds()
      );
    };
    const handleSelect = () => {
      console.log("state.id", state.id);
      IndexDB.selectData("table1", "friend", state.id, (e) => {
        console.log("查找数据", e);
        state.result1 = e.data;
      });
    };
    const handleInsertData = () => {
      IndexDB.insertData(
        "table1",
        "friend",
        state.nickId,
        {
          nickname: state.nickname,
          time: dateformat(new Date()),
        },
        (e) => {
          console.log("插入数据", e);
        }
      );
    };
    const handleChangeData = () => {
      IndexDB.changeData(
        "table1",
        "friend",
        state.nickId,
        {
          nickname: state.nickname,
          time: dateformat(new Date()),
        },
        (res) => {
          console.log("修改数据", res);
        }
      );
    };

    const handleDeleteData = () => {
      IndexDB.deleteData("table1", "friend", state.nickId, (res) => {
        console.log("删除数据", res);
      });
    };
    const handleClearTable = () => {
      IndexDB.clearTable("table1", "friend", (res) => {
        console.log("清空数据表", res);
      }); //清空库表，不是清库，是清表数据
    };
    const readAll = () => {
      IndexDB.readAll(
        "table1",
        "friend",

        (res) => {
          console.log("获取全部数据", res);
        }
      );
    };

    const handleFuSelectData = () => {
      console.log("state.id", state.id);
      IndexDB.selectData("table1", "friend", state.id, (e) => {
        console.log("模糊查询", e);
        state.result1 = e.data;
      });
    };

    return {
      state,
      handleSelect,
      handleInsertData,
      handleChangeData,
      handleDeleteData,
      handleClearTable,
      readAll,
      handleFuSelectData,
    };
  },
};
</script>
