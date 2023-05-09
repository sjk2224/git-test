import { defineStore } from "pinia";
import todoApi from "src/apis/todoApi";


export default defineStore("DBuseTodo", {

  state:()=>({
    tasks: [],
    totalCount: 0,
  }),

  getters : {

  },

  actions: {
    //db추가
    async addDbTaskStore(task) {
      if(!task){
          this.$refs.list.focus();
      }
      const payload = {
          title: task,
      }
      //저장
      const result = await todoApi.create(payload);
      if(result.status == 200){
          console.log(result.data.id)
          if(result.data.id){
              this.tasks.unshift({
                  id: result.data.id,
                  title: task,
                  done: "N",
              });
              this.totalCount++;
          }
          return true;
      }else{
        return false;
      }
    },
        //목록가져오기
        async fetchDataStore() {
        const len = 5;
        const lastId = this.tasks.length ? this.tasks[this.tasks.length - 1].id : 0;
        if (this.tasks.length > 0 && this.tasks.length == this.totalCount) {
            console.log("fetchData 호출안함", this.tasks.length, this.totalCount);
            return false;
        }
        const payload = {
            lastId,
            len,
        };
        console.log("payload : ",payload)
        const result = await todoApi.list(payload);
        console.log("result : ",result)
        if (result.data.list) {
            console.log("sucess")
            this.tasks = [...this.tasks,...result.data.list];
            this.totalCount = result.data.totalCount;
        }
    },

    //수정
    async editDBTodoStore(item,editTask,origin) {
        const idx = this.tasks.findIndex((task) => task == item);
        item.done = "N";
        this.tasks.splice(idx, 1, item);
        console.log("sucess")
        if (editTask.title != origin){
            const result = await todoApi.update(item);
            if(result.status == 200){
                return true;
            }else{
                return false;
            }
        }
    },

    //삭제
    async removeDBItemStore(item) {
        const idx = this.tasks.findIndex((task) => task.id == item.id);
        this.tasks.splice(idx,1);
        await todoApi.remove(item);
        
    },

    //더미리스트 만들기
    async resetDbStore() {
        const payload = {
            title: "todo_",
            done: "N",
            len: 100,
        };
        const result = await todoApi.reset(payload);
        if(result.status == 200){
            console.log(result.status);
            this.fetchDataStore();
        }
    },

  }
})