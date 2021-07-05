
const url = "http://localhost:8080";

export const postLeadRecord = async(data, token) =>{

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
        error.value = responseData.value || ""
        throw(error)
    }
    return responseData;
}