<template>
  <div class="home">
    <div>
      nickname:
      <input type="text" v-model="state.nickname1">
      <button @click="handleSelect">查找</button>
      <button @click="handleFuSelectData">模糊查询</button>
      <div v-if="state.result1.nickname">
        {{ state.result1.nickname }}{{ state.result1.time }}
      </div>
    </div>
    <div>
      nickname:
      <input type="text" v-model="state.nickname2">
      <button @click="handleInsertData">插入</button>
      <button @click="handleChangeData">修改</button>
      <button @click="handleDeleteData">删除</button>
      <button @click="handleClearTable">清空</button>
    </div>
    <div>
      nickname_old:
      <input type="text" v-model="state.nickname3">
      nickname_new:
      <input type="text" v-model="state.nickname4">
      <button @click="handleChangeData">修改</button>
    </div>
    <button @click="readAll">获取全部</button>
    <button @click="readAllByTime">根据时间获取全部</button>

    <table v-if="state.arr&&state.arr.length">
      <tr>
        <th>id</th>
        <th>昵称</th>
        <th>创建时间</th>
      </tr>
      <tr v-for="(item, index) in state.arr" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.nickname }}</td>
        <td>{{ item.createdAt }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src

import Idb from 'idb-js'  //  引入Idb
import db_user from '../common/db_user_config'

import {reactive} from "vue";

export default {
  name: "HomeView",
  setup() {
    Idb(db_user).then(user_db => {     //  载入配置，数据库开启成功后返回该数据库实例

      state.user_db = user_db
      // /**
      //  * @method close_db 关闭此数据库
      //  * */
      //
      // user_db.close_db();
      //
      //
      // /**
      //  * @method delete_db 删除此数据库
      //  * */
      //
      // user_db.delete_db();
      //
      //
      // /**
      //  * @method 增加单条数据
      //  * */
      //
      // user_db.insert({
      //   tableName: "grade",
      //   data: {
      //     id: 1,
      //     score: 98,
      //     name: "小明"
      //   },
      //   success: () => console.log("添加成功")
      // });
      //
      //
      // /**
      //  * @method 增加多条数据
      //  * */
      //
      // user_db.insert({
      //   tableName: "grade",
      //   data: [{
      //     id: 1,
      //     score: 98,
      //     name: "小明"
      //   },{
      //     id: 2,
      //     score: 99,
      //     name: "小方"
      //   }],
      //   success: () => console.log("添加成功")
      // });
      //
      //
      // /**
      //  * @method 查询数据（游标）
      //  * */
      //
      // user_db.query({
      //   tableName: "grade",
      //   condition: (item)=> item.score == 100,
      //   success: r => {
      //     console.log(r);
      //   }
      // });
      //
      //
      // /**
      //  * @method 修改数据
      //  * */
      //
      // user_db.update({
      //   tableName: "grade",
      //   condition:item => item.name == '小明',
      //   handle: r => {
      //     r.score = 80;
      //   },
      //   success: r => {
      //     console.log("修改成功", r);
      //   }
      // });
      //
      //
      //
      // /**
      //  * @method 删除数据
      //  * */
      //
      // user_db.delete({
      //   tableName: "grade",
      //   condition: (item)=> item.name == '小明',
      //   success: (res) => {
      //     console.log("删除成功");
      //   }
      // });
      //
      //
      //
      // /**
      //  * @method 查询某张表的所有数据
      //  * */
      // user_db.queryAll({
      //   tableName: "grade",
      //   success: (res) => {
      //     console.log(res)
      //   }
      // });
      //
      //
      //
      // /**
      //  * @method 根据主键查询某条数据
      //  * */
      // user_db.query_by_primaryKey({
      //   tableName:'grade',
      //   target:1,
      //   success:(res)=>{console.log(res)}
      // })
      //
      //
      // /**
      //  * @method 根据索引查询某条数据
      //  * */
      // user_db.query_by_index({
      //   tableName:'grade',
      //   indexName:'name',
      //   target:'小明',
      //   success:(res)=>{console.log(res)}
      // })
      //
      // /**
      //  * @method 清空某张表的数据
      //  * */
      // user_db.clear_table({
      //   tableName:'grade'
      // })
      //
      // /**
      //  * @method 通过主键删除某条数据
      //  * */
      // user_db.delete_by_primaryKey({
      //   tableName:'grade',
      //   target:1,
      //   success:()=>console.log('删除成功')
      // })
      //
      //
      // /**
      //  * @method 通过主键更改某条数据
      //  * */
      // user_db.update_by_primaryKey({
      //   tableName: "grade",
      //   target: 1,
      //   handle: val => (val.score = 101),
      //   success: res => {
      //     console.log(res);
      //   }
      // });
    }, err => {
      console.log(err)
    });
    const state = reactive({
      nickname1: "",
      nickname2: "",
      nickname3: '',
      nickname4: '',
      result1: {},
      result2: {},
      arr: [],
      level: 1,
    });


    const dateformat = (date) => {
      return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
      );
    };
    const handleSelect = () => {
      state.user_db.query({
        tableName: "user",
        condition: item => item.nickname === state.nickname1,
        success: r => {
          console.log("模糊查询", r);
        }
      });
    };
    const handleInsertData = () => {
      state.user_db.insert({
        tableName: "user",
        data: {
          nickname: state.nickname2,
          time: new Date()
        },
        success: () => console.log("添加成功")
      });
    };
    const handleChangeData = () => {
      state.user_db.update({
        tableName: "user",
        condition: item => item.nickname === state.nickname3,
        handle: r => {
          r.nickname = state.nickname4;
        },
        success: r => {
          console.log("修改成功", r);
        }
      });
    };

    const handleDeleteData = () => {
      state.user_db.delete({
        tableName: "user",
        condition: item => item.nickname === state.nickname2,
        success: r => {
          console.log("删除成功", r);
        }
      });
    };
    const handleClearTable = () => {
      state.user_db.clear_table({
        tableName: 'user',
      })
    };
    const readAll = () => {
      state.user_db.queryAll({
        tableName: "user",
        success: (arr) => {
          console.log(arr)
          arr.map((item, key) => {
            item.id = key
            item.createdAt = dateformat(item.time)
          })
          state.arr = arr
        }
      });
    };

    const readAllByTime = () => {
      state.user_db.queryAll({
        tableName: "user",
        success: (arr) => {
          console.log(arr)
          arr.map((item, key) => {
            item.id = key
            item.createdAt = dateformat(item.time)
          })
          arr.sort((a,b)=>b.time-a.time)
          state.arr = arr
        }
      });
    };

    const handleFuSelectData = () => {
      state.user_db.query({
        tableName: "user",
        condition: item => item.nickname.indexOf(state.nickname1) !==-1,
        success: r => {
          console.log("模糊查询", r);
        }
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
      readAllByTime,
    };
  },
};
</script>
