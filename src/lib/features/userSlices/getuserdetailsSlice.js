import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserDetails = createAsyncThunk(
  "getuserinfo/loggedInUserDetails",
  async (values, { rejectWithValue }) => {
    const payload = {
      userEmail: values?.userEmail,
    };
    // console.log("payloadddd", payload);
    try {
      const response = await axios.post(`/api/getuserinfo`, payload, {
        headers: {
          Authorization: `Bearer ${values?.token}`,
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
    userDetails: {},
  },
  status: "",
  error: "",
};

export const getuserinfoSlice = createSlice({
  //   name: 'auth',
  name: "getuserinfo",
  initialState,
  reducers: {
    resetGetUserInfo: (state) => {
      state.details = {
        userDetails: {},
      };
      state.status = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetGetUserInfo } = getuserinfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userDetails = (state: RootState) => state.userDetails
export const loggedInUserDetails = (state) => state.loggedInUserDetails;

export default getuserinfoSlice.reducer;
