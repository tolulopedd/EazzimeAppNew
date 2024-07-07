import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPassword = createAsyncThunk(
  "updatepassword/updatePasswordDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/passwordupdate", values);
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
    status: "",
  },
  status: "",
  error: "",
};

export const passwordresetSlice = createSlice({
  name: "updatepassword",
  initialState,
  reducers: {
    resetPasswordFields: (state) => {
      state.details = {
        status: "",
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { resetPasswordFields } = passwordresetSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const updatePasswordDetails = (state) => state.updatePasswordDetails;

export default passwordresetSlice.reducer;
