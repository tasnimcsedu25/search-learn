function Validation(values) {

  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (values.email === "") {
    error.email = "Email shouldn't be empty"
  }
  // else if (!email_pattern.test(values.email)) {
  //   error.email = "Email didn't match"
  // }
  else {
    error.email = ""
  }
  if (values.password === "") {
    error.password = "Password shouldn't be empty"
  } else {
    error.password = ""
  }
  return error;
}

export default Validation;