import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name:"gemini",
    initialState:{
        showGeminiSearch:false,
        geminiMovieNames:null,
        geminiMovieResults:null
    },
    reducers:{
        toggleGeminiSearchView:(state)=>{
            state.showGeminiSearch = !state.showGeminiSearch;
        },
        addGeminiMovieResult:(state, action)=>{
            const {geminiMovieNames, geminiMovieResults} = action.payload;
            state.geminiMovieNames = geminiMovieNames;
            state.geminiMovieResults = geminiMovieResults;
        },
        removeGeminiMovieResult:(state)=>{
            state.geminiMovieNames = null;
            state.geminiMovieResults = null;
        }
    }
})

export const {toggleGeminiSearchView, addGeminiMovieResult, removeGeminiMovieResult} = geminiSlice.actions;
export default geminiSlice.reducer;