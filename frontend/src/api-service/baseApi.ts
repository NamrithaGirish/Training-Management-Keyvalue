import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl:
            "https://5877-2402-3a80-1e03-24fd-73d0-e114-de9-c491.ngrok-free.app/",
        prepareHeaders: (headers) => {
            headers.set("ngrok-skip-browser-warning", "true")
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
