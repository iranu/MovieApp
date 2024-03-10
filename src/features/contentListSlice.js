/**
 * This file defines the contentListSlice reducer using Redux Toolkit.
 * It manages the state related to fetching and searching content data.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constant';

// defining the initial state
const initialState = {
  data: [],
  currentPage: 1,
  loading: true,
  error: null,
};

// defining the thunk action to fetch initial data asynchronously
export const fetchData = createAsyncThunk(
  'content/fetchInitialData',
  async (currentPage,thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}api/CONTENTLISTINGPAGE-PAGE${currentPage}.json`);
      return response.data.page['content-items'].content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const contentListSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    searchData(state, action) {
      // convert search term to lowercase for case-insensitive search
      const searchTerm = action.payload.toLowerCase(); 
      state.dataSearched = state.data.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        //loading
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
        state.currentPage += 1;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { searchData } = contentListSlice.actions;
export default contentListSlice.reducer;
