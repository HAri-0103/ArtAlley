import { configureStore } from '@reduxjs/toolkit';
import reducer from './likedSlice';

const store = configureStore({
    reducer: {
        liked: reducer,
    },
});

export default store;