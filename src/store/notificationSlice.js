import { createSlice } from "@reduxjs/toolkit"

const initialState={
  showNotification:false,
  msg:'',
  type:'',
  sessionExpired:false,
}

const notificationSlice = createSlice({
  name:"notification",
  initialState,
  reducers:{
    showNotification(state,action)
    {
      state.msg=action.payload.msg;
      state.type=action.payload.type;
      state.showNotification = true;
    },
    hideNotification(state)
    {
      state.msg='';
      state.showNotification=false;
      state.type='';
    },
    showSessionExpired(state)
    {
      state.sessionExpired=true;
    },
    hideSessionExpired(state){
      state.sessionExpired=false;
    }
  }
})

export default notificationSlice;