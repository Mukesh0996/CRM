import { leadActions } from "./leads-slice";

const url = "http://localhost:8080";

export const getLeadsFields = async (orgId, token) => {
    const response = await fetch(`${url}/org/${orgId}/leads/leadstable`,{
        method:"GET",
        headers : {
            "Content-Type":"application/json",
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
    return responseData;
}

export const getFilterColumns = (orgId, token) => {
    return async (dispatch) => {
        const response = await fetch(`${url}/org/${orgId}/leads/getfilterColumns`,{
            method:"GET",
            headers : {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const responseData = await response.json();

        if(!response.ok) {
            let error = new Error(responseData.message || "Error Occured!")
            error.isValid = responseData.isValid || false;
            error.value = responseData.value || "";
            throw(error);
        }
        dispatch(leadActions.addFilterColumns({
            filterColumns: responseData.data
        }))
       
    }
}


export const getAllLeads = (orgId, token) => {
    return async (dispatch) => {
        const response = await fetch(`${url}/org/${orgId}/leads/getrecords`,{
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
        dispatch(leadActions.replaceLeads({
            leads: responseData.data.leads,
            cols: responseData.data.leadCols,
            canCreate : true,
            canEdit: true
        }))
    }
}

export const addLeadRecord = (data, token) => {

    return async (dispatch) => {
        const { orgId } = data;
        delete data['orgId'];
        const leadObj = data;
        const response = await fetch(`${url}/org/${orgId}/leads/addrecord`,{
        method:"POST",
        body: JSON.stringify(leadObj),
        headers :{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const responseData = await response.json();

    if(!response.ok) {
        let error = new Error(responseData.message);
        error.isValid = responseData.isValid || false;
        error.value = responseData.value || "";
        throw(error);
    }
    console.log(responseData);
    dispatch(leadActions.addLead({
        lead: responseData.data
    }));
    }
}