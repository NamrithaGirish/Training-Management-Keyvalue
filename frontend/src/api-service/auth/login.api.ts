import baseApi from "../baseApi";
import type { LoginPayload, LoginResponse } from "./login.types";

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (payload) => ({
                url: "/auth/login",
                method: "POST",
                body: payload
            })
        })
    })
});

export const { useLoginMutation } = loginApi;