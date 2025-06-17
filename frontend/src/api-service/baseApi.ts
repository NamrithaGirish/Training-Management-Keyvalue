import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders: (headers) => {
            // const token = localStorage.getItem("token");
            // if (token) {
            //     headers.set("Authorization", `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: () => ({}),
});

export default baseApi;