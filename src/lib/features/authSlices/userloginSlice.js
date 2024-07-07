import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userAuth = createAsyncThunk(
  "userlogin/userLoginDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/userlogin", values);
      console.log("response", response.data)
      return response.data;
    } catch (error) {
        console.log("error...", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  details: {
    email: "",
    status: "",
    token: "",
    role: null,
  },
  status: "",
  error: "",
};

export const userloginSlice = createSlice({
  name: "userlogin",
  initialState,
  reducers: {
    logout: (state) => {
      state.details = {
        email: "",
        status: "",
        token: "",
        role: null,
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userAuth.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(userAuth.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(userAuth.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { logout } = userloginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const userLoginDetails = (state) => state.userLoginDetails;

export default userloginSlice.reducer;
