import baseApi from "../baseApi";
import type { TrainingDetailsPayload } from "./training.types";

export const trainingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTrainingList: builder.query({
            query: () => ({ url: "/trainings", method: "GET" }),
        }),
        getTrainingById: builder.query<TrainingDetailsPayload, { id: number }>({
            query: (payload) => ({
                url: `/trainings/1`,
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
