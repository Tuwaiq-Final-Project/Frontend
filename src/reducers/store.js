import {combineReducers, createStore} from "redux"

import userReducer from "./user"

const reducers = combineReducers({userReducer})
const store = createStore(reducers)

export default store
