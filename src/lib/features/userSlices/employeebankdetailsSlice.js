import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBankDetails = createAsyncThunk(
  "getbankdata/getEmployeeBankDetails",
  async (values, { rejectWithValue }) => {
    console.log(values);
    const data = {
      account_key: values?.account_key,
    };
    try {
      const response = await axios.post("/api/employeebankdetails", data, {
        headers: {
          Authorization: `Bearer ${`"${values?.token}"`}`,
        },
      });
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
    detailAccount: [
      {
        bank_account: "",
        bank: "",
      },
    ],
  },
  status: "",
  error: "",
};

export const employeebankdetailsSlice = createSlice({
  //   name: 'auth',
  name: "getbankdata",
  initialState,
  reducers: {
    resetBankDataFields: (state) => {
      state.details = {
        status: "",
        account_key: "",
        detailAccount: [
          {
            bank_account: "",
            bank: "",
          },
        ],
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBankDetails.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetBankDataFields } = employeebankdetailsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const getEmployeeBankDetails = (state) => state.getEmployeeBankDetails;

export default employeebankdetailsSlice.reducer;
