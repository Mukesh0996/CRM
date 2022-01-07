import { leadActions } from "./leads-slice";

const url = "http://localhost:8080";

export const getLeadsFields = async (orgId, token) => {
    const response = await fetch(`${url}/leads/org/${orgId}/leadstable`,{
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
    // responseData will be destructed in the respective component
    return responseData;
}

export const getFilterColumns = (orgId, token) => {
    return async (dispatch) => {
        const response = await fetch(`${url}/leads/org/${orgId}/getfilterColumns`,{
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
        const response = await fetch(`${url}/leads/org/${orgId}/getrecords`,{
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
        const leadObj = data;
        const response = await fetch(`${url}/leads/org/${orgId}/addrecord`,{
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
    dispatch(leadActions.addLead({
        lead: responseData.data
    }));
    return responseData.data;
    }
}

export const getSingleLeadRecord = async (data, token) => {
    const { orgId, leadId } = data;
    const response = await fetch(`${url}/leads/org/${orgId}/lead/${leadId}`, {
        method: "GET",
        headers :{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const responseData = await response.json();
    if(!response) {
        let error = new Error(responseData.message);
        error.isValid = responseData.isValid || false;
        error.value = responseData.value || "";
        throw(error);
    }

    return responseData;

}

export const LeadAddNote = (data, token) => {
    return async () => {
        let { orgId, leadId, note } = data;
        console.log(orgId, leadId, note);
    }
}