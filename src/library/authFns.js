const url = "http://localhost:8080";

export const postSignIn = async (data) => {
    const response = await fetch(`${url}/login`, {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    if(!response.ok) {
       let error = new Error(responseData.message);
       error.isValid = responseData.isValid;
       error.value = responseData.value;
       throw(error);
      
    }
    return responseData;
}

export const postSignUp = async(data) => {
    const response = await fetch(`${url}/signup`, {
        method:"POST",
        body: JSON.stringify(data),
        headers : {
            "Content-Type": "application/json"
        }
    });
    const responseData = await response.json();
    if(!response.ok) {
        let error = new Error(responseData.message);
        error.isValid = responseData.isValid;
        error.value = responseData.value;
        throw(error);
    }
    return responseData;
}