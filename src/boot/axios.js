import { boot } from 'quasar/wrappers'
import axios from 'axios'
import Config from '../../api-server/config'
import { Notify } from 'quasar'
import { LoadingBar } from 'quasar'

function intercepterRes(name, isDev=False ){
  return function(response){
    let { data, status } = response;
    
    if (isDev){
      console.log("AJAX",name,status,data);
    }

    try{
      if(status && status !== 200){
        let message = `${name} AJAX Error : ${status}`;
        try{
          Notify.create({ type: "negative", message: message});
          LoadingBar.increment(50);
          LoadingBar.setDefaults({
            color: "purple",
            size: "5px",
            position : "bottom",
          });
        }catch(error){
          throw new Error(`${name} AJAX Error : ${status}`);
        }
      }

      try{
        if(data.status != 200){
          LoadingBar.increment(50);
          LoadingBar.setDefaults({
            color: "blue",
            size: "5px",
            position: "top",
          });
        }
        return data;
      }catch(error){
        if(isDev){
          console.error(error);
        }
      }
    }catch(error){
      if(isDev){
        console.error(error);
      }
      return false;
    }
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const isDev = process.env.NODE_ENV == "development";
const config = isDev ? Config.development :  Config.production;
const api = axios.create({ baseURL: config.API_SERVER, withCredentials: true });
api.interceptors.response.use(intercepterRes("api",isDev));

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, axios };
