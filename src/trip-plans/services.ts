import { db } from "../firebaseAdmin";
import { ITripPlan } from "../models/ITripPlan";


export const tripPlanService = {
    createTripPlan: async (tripPlanData: ITripPlan ): Promise<{success: boolean, data: any}> => {
        try {
            // Genera un nuevo ID para el documento
            const newTripPlanId = db.collection('tripPlan-dev').doc().id;

            // Crea el trip plan con el ID generado y los datos proporcionados
            await db.collection('tripPlan-dev').doc(newTripPlanId).set({
                ...tripPlanData,
                dateCreated: new Date(),
                documentId: newTripPlanId // Asigna el ID generado al campo documentId si lo deseas
            });

            // Realiza las operaciones adicionales necesarias, por ejemplo, crear un documento relacionado
            await db.collection('interactions-dev').doc(newTripPlanId).set({}); // Ejemplo de creación de un documento relacionado sin campos adicionales

            return { success: true, data: newTripPlanId };
        } catch (error) {
            return {
                success: false,
                data: null
            }   
        }
    }
}