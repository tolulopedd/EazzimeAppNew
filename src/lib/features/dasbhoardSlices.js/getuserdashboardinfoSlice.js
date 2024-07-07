import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserDashboardInfo = createAsyncThunk(
  "getdashdetails/getUserDashboardInfo",
  async (values, { rejectWithValue }) => {
    console.log("values dasboard info", values)
    try {
      const response = await axios.get(
        `/api/getdashboardinfo/?accountid=${values?.accountId}`,
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
    accountid: "",
    detailAccount: [
      {
        available_balance: 0,
        utilized_balance: 0,
        repaid_balance: 0,
        username: 0,
      },
    ],
  },
  status: "",
  error: "",
};

export const getuserdashboardinfoSlice = createSlice({
  //   name: 'auth',
  name: "getdashdetails",
  initialState,
  reducers: {
    resetDashboardInfoFields: (state) => {
      state.details = {
        status: "",
        accountid: "",
        detailAccount: [
          {
            available_balance: 0,
            utilized_balance: 0,
            repaid_balance: 0,
            username: 0,
          },
        ],
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDashboardInfo.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUserDashboardInfo.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchUserDashboardInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDashboardInfoFields } = getuserdashboardinfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const getUserDashboardInfo = (state) =>
  state.getUserDashboardInfo;

export default getuserdashboardinfoSlice.reducer;
