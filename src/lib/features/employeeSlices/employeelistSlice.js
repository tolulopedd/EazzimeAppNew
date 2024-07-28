import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployeeList = createAsyncThunk(
  "getemployeelist/employeeListDetails",
  async (values, { rejectWithValue }) => {
    console.log("values employe info", values);
    try {
      const response = await axios.get(`/api/employeelist`, {
        headers: {
          Authorization: `Bearer ${`"${values?.token}"`}`,
        },
        // params: {
        //   accountId: values?.accountId,
        // },
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
    employerDashboardMetrics: [
      {
        snumber: "",
        fullname: "",
        email: "",
        datecreated: "",
        status: "",
      },
    ],
  },
  status: "",
  error: "",
};

export const employeelistSlice = createSlice({
  //   name: 'auth',
  name: "getemployeelist",
  initialState,
  reducers: {
    resetEmployeeList: (state) => {
      state.details = {
        status: "",
        employerDashboardMetrics: [
          {
            snumber: "",
            fullname: "",
            email: "",
            datecreated: "",
            status: "",
          },
        ],
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeList.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchEmployeeList.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchEmployeeList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetEmployeeList } = employeelistSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const employeeListDetails = (state) => state.employeeListDetails;

export default employeelistSlice.reducer;
