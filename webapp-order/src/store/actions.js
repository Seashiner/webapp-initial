import axios from '@/http/http'
import {GETSELLER,GETGOODS,GETRATINGS} from "@/store/mutation_typies.js"

export default {

  async [GETSELLER](store){
    const result = await axios.get("/api/seller")
    const {code,data} = result
    if(code===200){
      store.commit(GETSELLER,data)
    }
  },

  async [GETGOODS](store){
    const result = await axios.get("/api/goods")
    const {code,data} = result
    if(code===200){
      store.commit(GETGOODS,data)
    }
  },

  async [GETRATINGS](store){
    const result = await axios.get("/api/ratings")
    const {code,data} = result
    if(code===200){
      store.commit(GETRATINGS,data)
    }
  }
  
}


