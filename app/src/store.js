import { configureStore } from "@reduxjs/toolkit";

import authSlliceReducer from "./slices/authSllice";

const store = configureStore({
  reducer: {
    auth: authSlliceReducer,
  },
});

export default store;
