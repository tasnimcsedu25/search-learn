function Validation(values){
 
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    //for name
    if(values.name===""){
        error.name="Name shouldn't be empty"
    }
    else{
        error.name=""
    }
    //for email
    if(values.email===""){
        error.email="email shouldn't be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Email didn't match"
    }else{
        error.email=""
    }
if(values.password===""){
    error.password="Password shouldnt be empty"
    }
      
    else
    {error.password = ""}
    return error;
}

export default Validation;