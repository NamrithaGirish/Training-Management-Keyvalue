
import baseApi from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDashboardData: builder.query({
            query: (payload) => ({
                url: `/analytics/users/${payload.id}`,
                method: "GET",
            }),
        }),
        getUserById: builder.query({
            query: (payload) => ({
                url: `/users/${payload.id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserDashboardDataQuery, useGetUserByIdQuery } = userApi;

