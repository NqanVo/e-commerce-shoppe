import { createSlice } from "@reduxjs/toolkit";
import { LoginUserProps } from "../../components/Layout/Auth/Auth";

export interface initStateLoginProps {
  loading: boolean;
  userData: LoginUserProps;
}

const initStateLogin: initStateLoginProps = {
  loading: false,
  userData: JSON.parse(localStorage.getItem("userData")!) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initStateLogin,
  reducers: {
    loginStart: (state) => {
      return { ...state, loading: true };
    },
    loginSuccess: (state, action) => {
      return { loading: false, userData: action.payload };
    },
    loginFail: (state) => {
      return { ...state, loading: false };
    },
  },
});

export const { loginStart, loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;
