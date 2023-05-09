import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from 'quasar'
import { defineComponent } from "vue";
import todoApi from "src/apis/todoApi";


export default defineStore("useTodo", {

  state:()=>({
    tasks: [],
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
  }
})