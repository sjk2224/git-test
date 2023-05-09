import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from 'quasar'
import todoApi from "src/apis/todoApi";


export default defineStore("useTodo", {

  state:()=>({
    newTask: "",
    tasks: [],
    totalCount: 0,
    origin: null,
    editTask: null,
  }),

  getters : {

  },

  actions: {
    insertTodo(title){
      if(this.tasks){
        this.tasks.unshift({
          id: uid(),
          title,
          done:'N'
        });
      }else{
        this.tasks=[];
        this.tasks.push({
          id: uid(),
          title,
          done:'N'
        })
      }

      LocalStorage.set("todo", this.tasks);
    },
    //삭제
    removeTodo(id){
      const idx = this.tasks.findIndex(task => task.id == id);
      this.tasks.splice(idx,1);
      LocalStorage.set("todo",this.tasks);
    },
    //새로고침 유지
    listTodo(){
      this.tasks = LocalStorage.getItem("todo");
    },
    //새로고침 수정 유지
    editTodo(item){
      const idx = this.tasks.findIndex(task=>task == item);
      item.done = 'N';
      this.tasks.splice(idx,1,item);
      LocalStorage.set("todo",this.tasks);
    },

    //db추가
    async addDbTask() {
      if(!this.newTask){
          this.$refs.list.focus();
      }
      const payload = {
          title: this.newTask,
      }
      //저장
      const result = await todoApi.create(payload);
      if(result.status == 200){
          console.log(result.data.id)
          if(result.data.id){
              this.tasks.unshift({
                  id: result.data.id,
                  title: this.newTask,
                  done: "N",
              });
              this.totalCount++;
          }
          await this.$q.notify({
              message: `${this.newTask} 추가하셨습니다.`,
              icon: "home",
              color: "primary",
          });
          this.newTask = "";
      }
    },
      //목록가져오기
      async fetchData() {
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
        if (result.data.list) {
            this.tasks = [...this.tasks, ...result.data.list];
            this.totalCount = result.data.totalCount;
        }
    },
    
    //intersection
    async onIntersection(entry) {
        if (entry.isIntersecting) {
        this.$q.loading.show();
        await this.fetchData();
        this.$q.loading.hide();
        }
    },
    //다이얼로그 열기
    openDialog(item) {
        this.$refs.dialog.dialog = true;
        this.editTask = item;
        this.origin = this.editTask.title;
    },
    //수정
    async editDBTodo(item) {
        const idx = this.tasks.findIndex((task) => task == item);
        item.done = "N";
        this.tasks.splice(idx, 1, item);

        if (this.editTask.title != this.origin){
            await todoApi.update(item);
            await this.$q.notify({
                message: `${item.title} 수정하셨습니다.`,
                icon: "home",
                color: "primary",
            });
        }
    },

    //삭제
    async removeDBItem(item) {
        const idx = this.tasks.findIndex((task) => task.id == item.id);
        this.tasks.splice(idx,1);
        const result = await todoApi.remove(item);
        if(result.status == 200){
            await this.$q.notify({
                message: `${item.title} 삭제하셨습니다.`,
                icon: "home",
                color: "primary",
            });
        }
    },

    //더미리스트 만들기
    async resetDb() {
        const payload = {
            title: "todo_",
            done: "N",
            len: 100,
        };
        const result = await todoApi.reset(payload);
        if(result.status == 200){
            console.log(result.status);
            this.fetchData();
        }
    },

  }
})