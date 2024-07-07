import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const partnerCreation = createAsyncThunk(
  "createpartner/createPartnerDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/createpartner", values);
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

export const createpartnerSlice = createSlice({
  name: "createpartner",
  initialState,
  reducers: {
    resetCreatePartnerFields: (state) => {
      state.details = {
        email: "",
        status: "",
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(partnerCreation.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(partnerCreation.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(partnerCreation.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { resetCreatePartnerFields } = createpartnerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const createPartnerDetails = (state) => state.createPartnerDetails;

export default createpartnerSlice.reducer;
