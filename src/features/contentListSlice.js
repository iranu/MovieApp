/**
 * This file defines the contentListSlice reducer using Redux Toolkit.
 * It manages the state related to fetching and searching content data.
 */

import { createSlice } from '@reduxjs/toolkit';
import { json } from '../data';

// initial state for the contentListSlice reducer
const initialState = {
  data: [], // array to store fetched data
  currentPage: 1, // current page number
  dataSearched: [], // array to store search results
};

// create contentListSlice using createSlice function
const contentListSlice = createSlice({
  name: 'content', 
  initialState, 
  reducers: {
    // action to fetch initial data
    fetchInitialData(state) {
      state.data = json.page1['page']['content-items'].content; 
      state.currentPage = 1; // Set current page to 1
    },
    // action to fetch next page data
    fetchNextPage(state) {
      const nextPageData = json[`page${state.currentPage + 1}`]; 
      if (nextPageData) {
        // if next page data exists
        state.data = [...state.data, ...nextPageData['page']['content-items'].content]; 
        state.currentPage += 1;
      }
    },
    // action to search data based on input text
    searchData(state, action) {
      state.dataSearched = state.data.filter(item =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
      console.log('state.dataSearched',state.dataSearched)
    }
  },
});

export const { fetchInitialData, fetchNextPage, searchData, resetSearchData } = contentListSlice.actions;
export default contentListSlice.reducer;
