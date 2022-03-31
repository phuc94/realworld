import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinAPI, getCurrentUserAPI } from "../../service/user";

const initialState = {
  authorized: false
}

export const signin = createAsyncThunk(
  'signin',
  async (formData) => {
    const response = await signinAPI(formData);
    return response.data;
  }
);

export const getCurrentUser = createAsyncThunk(
  'getCurrentUser',
  async () => {
    const response = await getCurrentUserAPI();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers : {
    logout : (state) => {
      console.log('logout');
      localStorage.removeItem('jwt-token');
      state.user = {};
      state.authorized = false;
    },
    update : (state, action) => {
      console.log('update');
      console.log(action);
      state.info = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(signin.rejected, (state, action) => {
        console.log('rejected');
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.info = action.payload.user;
        state.authorized = true;
        localStorage.setItem('jwt-token', action.payload.user.token);
        console.log('fulfilled');
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.info = action.payload.user;
        state.authorized = true;
        console.log('fulfilled');
      })
  }
})

export const { logout, update } = userSlice.actions;

export default userSlice.reducer;