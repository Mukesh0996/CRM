
const url = "http://localhost:8080";

export const getLeadsFields = async (orgId, token) => {
    console.log(token);
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

export const postLeadRecord = async(data, token) =>{
    console.log(token);
    const response = await fetch(`${url}/org/${data.orgId}/leads/addrecord`,{
        method:"POST",
        body: JSON.stringify(data),
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