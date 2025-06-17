import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://94de-2402-8100-2a79-f9ae-9edc-b5c3-9b54-7044.ngrok-free.app",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token.trim()}`);
            }
            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: () => ({}),
});

export default baseApi;