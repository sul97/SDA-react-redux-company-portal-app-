import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'
import compainesSlice from './features/compainesSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    compainesReducer : compainesSlice,
  },
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch