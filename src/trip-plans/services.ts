import { db } from "../firebaseAdmin";
import { getEnv } from "../helpers/getEnv";
import { ITripPlan, ITripPlanWithInteractions } from "../models/ITripPlan";

interface ITripPlanResponse {
    success: boolean
    error?: {
        message: string
        detail?: string
        code?: string
    }
}
interface ICreateTripPlanResponse extends ITripPlanResponse {
    data?: string
}
interface IGetTripPlansResponse extends ITripPlanResponse {
    data?: ITripPlanWithInteractions[]
}
export const tripPlanService = {
    createTripPlan: async (tripPlanData: ITripPlan ): Promise<ICreateTripPlanResponse> => {
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
                documentId: newTripPlanId, // Assign the ID generated
                interactionRef: newTripPlanId 
            });

            // Create trip plan´s interaction document
            await db
            .collection('interactions-' + getEnv())
            .doc(newTripPlanId) // we use the same id generated to link it with the trip plan
            .set({
                documentId: newTripPlanId,
                comments: [],
                shares: [],
                saves: [],
                likes: [],
            }); // We just create the document without any fields

            return { success: true, data: newTripPlanId };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error : new Error('An unknown error occurred')
            }   
        }
    },
    getTripPlans: async (): Promise<IGetTripPlansResponse> => {
        try {
            const tripPlansCollection = db.collection("tripPlans-" + getEnv());
            const snapshot = await tripPlansCollection.get();
            const tripPlans: ITripPlanWithInteractions[] = [];

            for (const doc of snapshot.docs) {
                const tripPlanData = doc.data();
                const interactionId = tripPlanData.interactionRef;
                
                // Make sure interactionId exists
                if (interactionId && typeof interactionId === 'string') {
                    const interactionDoc = await db.collection('interactions-' + getEnv()).doc(interactionId).get();
                    
                    if (interactionDoc.exists) {
                        // Add interaction's data to tripPlan object
                        tripPlanData.interactions = interactionDoc.data();
                    } else {
                        // If interaction document doesn't exist
                        tripPlanData.interactions = null;
                    }
                } else {
                    // Also handle case when there is no reference 
                    tripPlanData.interactions = null;
                }

                tripPlans.push(tripPlanData as ITripPlanWithInteractions);
            }

            return { success: true, data: tripPlans };
        } catch (error) {
            console.error("Error getting trip plans:", error);
            return {
                success: false,
                error: error instanceof Error ? { message: error.message } : { message: 'An unknown error occurred' }
            };
        }
    }
}