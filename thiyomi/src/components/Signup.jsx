import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { useAddContactMutation } from '../services/apiAuth'

import { useSelector, useDispatch } from 'react-redux';
import { addAuthy } from '../features/authySlice';
import { React, useEffect } from 'react';
function Signup() {

  const authy = useSelector((state) => state.authy)
  const dispatch = useDispatch()
  const [addContact] = useAddContactMutation();

  const addHandler = async() =>{
    if (authy.authy.email===undefined) {return;} else{
    const hernande = await addContact(authy.authy)
    if (hernande.error) { return alert(hernande.error.data.message)} else {console.log(hernande, "bravo")}
    }
    // console.log(authy.authy.email)
  }
  useEffect(function () {
      addHandler()
  }, [authy])
  const handleSubmit = (values, { 
      props, 
      setSubmitting 
    }) => {
      //const contact = JSON.stringify(values)
      const final = '{"email": "'+ values.email + '", "password": "'+values.password +'", "password_confirmation": "'+values.password_confirmation+'"}'
      console.log(final)
      console.log(JSON.parse(final))
      //alert(final);
      dispatch(addAuthy(JSON.parse(final)))     
      setSubmitting(false);
      return;
    }

    
return (
      <>
      {/* <p>// - {authy.authy}</p> */}
        <Formik
        initialValues={{
           email: '',
           password: '',
           password_confirmation: '',
        }}
        validate={(values) => {
          let errors = {};
      
        // if(!values.email)
        //      errors.email = "Email Address Required";
        if( values.password !== values.password_confirmation || !values.password || !values.email || values.password_confirmation.length <9 || !values.email.includes('@'))
             errors.password = "not adapted credentials"
             return errors;
        }}
        onSubmit={handleSubmit}
        render={formProps => {
          return(
            
            <Form>
              <h2>Register</h2>
                <Field 
                  type="text" 
                  name="email" 
                  placeholder="Email address" 
			         	/> 
                <ErrorMessage name="email" />
                <br/>
                <Field 
                 type="text" 
                 name="password" 
                 placeholder="Mot de Passe - MIN 8 caracteres MAX 20 caracteres" 
               /> 
               <ErrorMessage name="password" />
               <br/>
               <Field 
                 type="text" 
                 name="password_confirmation" 
                 placeholder="Confirmation Mot de Passe MIN 8 caracteres MAX 20 caracteres" 
               /> 
               <ErrorMessage name="password_confirmation" />
               <br/>
               <br/>              
                <button 
                  type="submit" 
                  disabled={formProps.isSubmitting}>
                    Submit Form
                 </button>
              </Form>
           );
        }}
     />
     </>
    )
}

export default Signup



  // const addHandler = () =>{
  //   return addContact(authy.authy)
  //   .then(response => {
  //     console.log(response)
  //   })
  //   // console.log(authy.authy)
  // }