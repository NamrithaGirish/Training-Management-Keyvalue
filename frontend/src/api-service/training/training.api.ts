import baseApi from "../baseApi";
import type { TrainingDetailsPayload } from "./training.types";

export const trainingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTrainingList: builder.query({
            query: () => ({ url: "/trainings", method: "GET" }),
        }),
        getTrainingById: builder.query({
            query: (payload) => ({
                url: `/trainings/${payload.id}`,
                method: "GET"
            }),
        }),
        createTraining: builder.mutation<{}, TrainingDetailsPayload>({
            query: (payload) => ({
                url: "/trainings",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetTrainingListQuery,
    useGetTrainingByIdQuery,
    useCreateTrainingMutation,
} = trainingApi;
