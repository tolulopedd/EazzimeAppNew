import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateDashboardData = createAsyncThunk(
  "dashupdate/dashUpdateDetails",
  async (values, { rejectWithValue }) => {
    console.log("values update", values);
    const payload = {
      accountid:values?.accountid
    }
    try {
      const response = await axios.put(
        `/api/updatedashboardinfo`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${`"${values?.token}"`}`,
          },
        }
      );
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
    accountid: "",
    status: "",
  },
  status: "",
  error: "",
};

export const updatedashboardSlice = createSlice({
  name: "dashupdate",
  initialState,
  reducers: {
    resetDashboardUpdateFields: (state) => {
      state.details = {
        accountid: "",
        status: "",
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateDashboardData.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(updateDashboardData.fulfilled, (state, action) => {
      state.details = action.payload;
      state.status = "success";
      state.error = "";
    });
    builder.addCase(updateDashboardData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

// export const { authSuccess, logout, onAuthStart, authFail } = authSlice.actions
export const { resetDashboardUpdateFields } = updatedashboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const dashUpdateDetails = (state) => state.dashUpdateDetails;

export default updatedashboardSlice.reducer;
