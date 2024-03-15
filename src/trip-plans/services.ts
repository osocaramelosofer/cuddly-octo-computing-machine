import { db } from "../firebaseAdmin";
import { getEnv } from "../helpers/getEnv";
import { ITripPlan } from "../models/ITripPlan";

interface ITripPlanResponse {
    success: boolean
    data?: string
    error?: {
        message: string
        detail?: string
        code?: string
    }
}
export const tripPlanService = {
    createTripPlan: async (tripPlanData: ITripPlan ): Promise<ITripPlanResponse> => {
        try {
            // Generate a new unique id for the doc
            const newTripPlanId = db
            .collection('tripPlans-' + getEnv())
            .doc()
            .id;

            // Create trip plan
            await db
            .collection('tripPlans-' + getEnv())
            .doc(newTripPlanId)
            .set({
                ...tripPlanData,
                dateCreated: new Date(),
                documentId: newTripPlanId // Assign the ID generated
            });

            // Create trip plan´s interaction document
            await db
            .collection('interactions-' + getEnv())
            .doc(newTripPlanId) // we use the same id generated to link it with the trip plan
            .set({}); // We just create the document without any fields

            return { success: true, data: newTripPlanId };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error : new Error('An unknown error occurred')
            }   
        }
    }
}