import baseApi from "../baseApi";
import type { TrainingDetailsPayload } from "./training.types";

export const trainingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTraining: builder.mutation<{}, TrainingDetailsPayload>({
            query: (payload) => ({
                url: "/trainings",
                method: "POST",
                body: payload
            })
        })
    })
});

export const { useCreateTrainingMutation } = trainingApi;