import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPartnerDashboardInfo = createAsyncThunk(
  "getpartnerdash/getPartnerDashboardInfoDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/getpartnerdashboardinfo/?userid=${values?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${`"${values?.token}"`}`,
          },
          // params: {
          //   accountId: values?.accountId,
          // },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  details: {
    status: "",
    employerDashboardMetrics: [
      {
        noofactiveemployees: 0,
        noofinactiveemployees: 0,
        totalemployee: 0,
      },
    ],
  },
  status: "",
  error: "",
};

export const getpartnerdashboardinfoSlice = createSlice({
  //   name: 'auth',
  name: "getpartnerdash",
  initialState,
  reducers: {
    resetPartnerDashboardInfoFields: (state) => {
      state.details = {
        status: "",
        employerDashboardMetrics: [
          {
            noofactiveemployees: 0,
            noofinactiveemployees: 0,
            totalemployee: 0,
          },
        ],
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPartnerDashboardInfo.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchPartnerDashboardInfo.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchPartnerDashboardInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetPartnerDashboardInfoFields } =
  getpartnerdashboardinfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const getPartnerDashboardInfoDetails = (state) =>
  state.getPartnerDashboardInfoDetails;

export default getpartnerdashboardinfoSlice.reducer;
