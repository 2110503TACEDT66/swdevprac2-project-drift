import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";



const persistConfig = {
     timeout: 2000,
     key: "rootPersist",
     storage: AsyncStorage,
}


const rootReducer = combineReducers({bookSlice})
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: reduxPersistedReducer
    // middleware:[]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector