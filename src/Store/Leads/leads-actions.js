import { leadsActions } from "./leads-slice";

const url = "http://localhost:8080";

export const getFields = (orgId, token) =>{
   
    return async (dispatch) => {
        console.log(dispatch);
        const response = await fetch(`${url}/org/${orgId}/leads/leadstable`,{
            method:"GET",
            headers : {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        dispatch(leadsActions.addFields({
            fields: responseData
        }));
        if(!response.ok) {
            let error = new Error(responseData.message || "Error Occured!")
            error.isValid = responseData.isValid || false;
            error.value = responseData.value || "";
            throw(error);
        }
       
    }
}
