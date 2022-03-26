import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testAPI } from "../../service/user";

const initialState = {
  text: 'user init state'
}

export const fetchArticle = createAsyncThunk(
  'fetchArticle',
  async () => {
    const response = await testAPI();
    return response.body;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers : {
    test : (state) => {
      console.log('updating');
      state.test = 'updated';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        console.log('rejected');
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log('fulfilled');
      })
  }
})

export const { test } = userSlice.actions;

export default userSlice.reducer;