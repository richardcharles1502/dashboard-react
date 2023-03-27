import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/loginSlice'
import DashboardReducer from '../slices/DashboardSlice'

export default configureStore({
  reducer: {
   login: loginReducer,    
   dashboard: DashboardReducer
  },
})