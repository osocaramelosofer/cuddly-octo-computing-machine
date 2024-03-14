import { db } from "../firebaseAdmin";

export const userService = {
    createUser: async ({name, username, email}: any): Promise<{success: boolean, data: any}> => {
        try {
            const docRef = await db.collection('test-users').add({
                name: name,
                username: username,
                email: email
            })
            if(docRef.id){
                return {
                    success: true,
                    data: docRef
                }
            }
            return {
                success: false,
                data: null
            }
        } catch (error) {
            return {
                success: false,
                data: null
            }   
        }
    }
}