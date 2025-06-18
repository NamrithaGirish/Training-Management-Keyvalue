import baseApi from "../baseApi";

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbackList: builder.query({
            query: () => ({
                url: "/feedback",
                method: "GET",
            }),
        }),
        createFeedback: builder.mutation({
            query: (payload) => ({
                url: "/feedback",
                method: "POST",
                body: payload
            }),
        }),
        
    }),
});

export const { useGetFeedbackListQuery, useCreateFeedbackMutation } = feedbackApi;
