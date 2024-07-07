import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInTouch = createAsyncThunk(
  "contactus/contactUsDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/contactus", values);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  details: {},
  status: "",
  error: "",
};

export const getintouchdemoSlice = createSlice({
  name: "contactus",
  initialState,
  reducers: {
    resetGetInTouchFields: (state) => {
      state.details = {};
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInTouch.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(getInTouch.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(getInTouch.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { resetGetInTouchFields } = getintouchdemoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const contactUsDetails = (state) => state.contactUsDetails;

export default getintouchdemoSlice.reducer;
