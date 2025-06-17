import baseApi from "../baseApi";

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSessionList: builder.query({
            query: () => ({ url: "/session", method: "GET" }),
        }),
        
        getSessionById: builder.query({
            query: (payload) => ({
                url: `/session/${payload.id}`,
                method: "GET"
            }),
        }),

        createSession: builder.mutation({
            query: (payload) => ({
                url: "/session",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetSessionListQuery,
    useGetSessionByIdQuery,
    useCreateSessionMutation,
} = sessionApi;
