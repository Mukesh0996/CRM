import { contactsActions } from "./contacts-slice";

const url = "http://localhost:8080";

export const getContactsFields = async (orgId, token) => {
        const response = await fetch(`${url}/org/${orgId}/contacts/contactsfields`,{
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