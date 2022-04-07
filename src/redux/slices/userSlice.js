import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinAPI, signupAPI, getCurrentUserAPI } from "../../service/user";

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

export const signup = createAsyncThunk(
  'signup',
  async (formData) => {
    const response = await signupAPI(formData);
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
      localStorage.removeItem('jwt-token');
      state.user = {};
      state.authorized = false;
    },
    update : (state, action) => {
      state.info = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
      })
      .addCase(signin.rejected, (state, action) => {
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.info = action.payload.user;
        state.authorized = true;
        localStorage.setItem('jwt-token', action.payload.user.token);
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.info = action.payload.user;
        state.authorized = true;
        localStorage.setItem('jwt-token', action.payload.user.token);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.info = action.payload.user;
        state.authorized = true;
      })
  }
})

export const { logout, update } = userSlice.actions;

export default userSlice.reducer;