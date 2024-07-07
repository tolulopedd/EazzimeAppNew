import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransactions = createAsyncThunk(
  "gettransactions/getTransactionDetails",
  async (values, { rejectWithValue }) => {
    console.log("values", values);
    try {
      const response = await axios.get(
        `/api/gettransactiondetails/?accountid=${values?.accountId}`,
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
    account_key: "",
    detailAccount: [],
  },
  status: "",
  error: "",
};

export const gettransactiondetailsSlice = createSlice({
  //   name: 'auth',
  name: "gettransactions",
  initialState,
  reducers: {
    resetTransactionDetails: (state) => {
      state.details = {
        status: "",
        account_key: "",
        detailAccount: [],
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchTransactions.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetTransactionDetails } = gettransactiondetailsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const getTransactionDetails = (state) => state.getTransactionDetails;

export default gettransactiondetailsSlice.reducer;
