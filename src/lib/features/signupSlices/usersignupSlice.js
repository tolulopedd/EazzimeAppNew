import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userCreation = createAsyncThunk(
  "createuser/createUserDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/usersignup", values);
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
  },
  status: "",
  error: "",
};

export const usersignupSlice = createSlice({
  name: "createuser",
  initialState,
  reducers: {
    resetCreateUserFields: (state) => {
      state.details = {
        email: "",
        status: "",
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userCreation.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(userCreation.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(userCreation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { resetCreateUserFields } = usersignupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const createUserDetails = (state) => state.createUserDetails;

export default usersignupSlice.reducer;
