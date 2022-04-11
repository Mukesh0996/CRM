import { contactsActions } from "./contacts-slice";

const url = "http://localhost:8080";

export const getContactsFields = async (orgId, token) => {
        const response = await fetch(`${url}/contacts/org/${orgId}/contactsfields`,{
            method:"GET",
            headers: {
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

export const getAllContacts =  (orgId, token) => {
    return async (dispatch) => {
      
        const response = await fetch(`${url}/contacts/org/${orgId}/getrecords`, {
            method:"GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    
        const responseData = await response.json();
        if(!response.ok) {
            let error = new Error(responseData.message);
            error.isValid = responseData.isValid;
            error.value = responseData.value;
            throw(error);
        }
       dispatch(contactsActions.replaceContacts({
           contacts: responseData.contacts,
           cols: responseData.contactsCols
       }))
    }

}

export const getContactsFilterColumns =  (orgId, token) => {

    return async (dispatch) => {
        const response = await fetch(`${url}/contacts/org/${orgId}/getfiltercolumns`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const responseData = await response.json();
        if(!response.ok){
            let error = new Error(responseData.message);
            error.isValid = responseData.isValid;
            error.value = responseData.value;
            throw(error);
        }
      
        dispatch(contactsActions.addFilterColumns({
            filterColumns: responseData.data.contactFilerColumns
        }))
    }

}