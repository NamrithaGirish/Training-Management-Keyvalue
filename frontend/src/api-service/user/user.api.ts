import baseApi, { ApiTagType } from "../baseApi";

export const trainingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
        getTrainingByUserId: builder.query<any, string>({
        query: (id) => ({
            url: `/analytics/users/${id}`,
            method: "GET",
        }),
  providesTags: [ApiTagType.TRAINING],
}),

    }),
});

export const {
    useGetTrainingByUserIdQuery
} = trainingApi;
