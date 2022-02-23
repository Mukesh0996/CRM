import { homeActions } from "./home-slice";

const url = "http://localhost:8080";


export const getCurrentYearLeadsChartData =  (orgId, token) => {
    return async (dispatch) => {
        const response = await fetch(`${url}/home/org/${orgId}/getLeads`,{
            method:"GET",
            headers :{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const responseData = await response.json();
       
        if(!response.ok) {
            let error = new Error(responseData.message || "Error Occured!")
            error.isValid = responseData.isValid || false;
            error.value = responseData.value || "";
            throw(error);
        }
        dispatch(homeActions.currentYearLeads({
            currentYearLeads: responseData.data
        }))
    }
}