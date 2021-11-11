import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {APIKey} from "../../common/apis/MovieApiKey";
import movieApi from "../../common/apis/movieApi";


export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async () => {
        const movieText = 'Harry';
        const response = await movieApi
            .get(
                `?apiKey=${APIKey}&s=${movieText}&type=movie`
            );
        console.log(response.data);
        return response.data;
    });

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows',
    async () => {
        const seriesText = 'Friends';
        const response = await movieApi
            .get(
                `?apiKey=${APIKey}&s=${seriesText}&type=series`
            );
        console.log(response.data);
        return response.data;
    });

const initialState = {
    movies: {},
    shows: {},
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, {payload}) => {
            state.movies = payload;
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully!");
            return {...state, movies: payload};
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully!");
            return {...state, shows: payload};
        },
    }
});

export const {addMovies} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;