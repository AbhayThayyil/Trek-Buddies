import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import adminSlice from "./slices/adminSlice";
import tripSlice from "./slices/tripSlice";
import chatSlice from "./slices/chatSlice";

// export default configureStore({
//   reducer: {
// user: userSlice,
// post: postSlice,
// admin: adminSlice,
// trip: tripSlice,
//   },
// });

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["admin"], // Exclude adminSlice from persistence
};

const rootReducer = combineReducers({
  user: userSlice,
  post: postSlice,
  trip: tripSlice,
  chat: chatSlice,
  admin: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
