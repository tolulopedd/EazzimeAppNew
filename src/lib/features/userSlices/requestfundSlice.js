import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fundRequest = createAsyncThunk(
  "employeerequestfund/requestFundDetails",
  async (values, { rejectWithValue }) => {
    const payload = {
      account_key: values.account_key,
      requestFundAmount: values?.requestFundAmount,
    };
    try {
      const response = await axios.post("/api/requestfund", payload, {
        headers: {
          Authorization: `Bearer ${`"${values?.token}"`}`,
        },
      });
      console.log("response", response);
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

export const requestfundSlice = createSlice({
  name: "employeerequestfund",
  initialState,
  reducers: {
    resetRequestFundFields: (state) => {
      state.details = {
        status: "",
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fundRequest.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(fundRequest.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(fundRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { resetRequestFundFields } = requestfundSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const requestFundDetails = (state) => state.requestFundDetails;

export default requestfundSlice.reducer;
