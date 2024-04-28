import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    likedStatus:false,
    userData:[],
    savedStatus:false,
    savedData:null,
    };

    export const likedSlice = createSlice({
        name: 'liked',
        initialState,
        reducers: {
            addLiked:(state,action)=>{
                state.userData = action.payload.userData;
                state.likedStatus = true;
            },
            addSaved:(state,action)=>{
                state.savedData = action.payload.savedData;
                state.savedStatus = true;
            },
            removeLiked:(state,action)=>{
                state.userData = [];
                state.likedStatus = false;
            },
            removeSaved:(state,action)=>{
                state.savedData = null;
                state.savedStatus = false;
            },
        },
    });

    export const {addLiked,addSaved,removeLiked,removeSaved} = likedSlice.actions;
    export default likedSlice.reducer;