import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAuthy } from '../features/authySlice';
import { addUserChange, clearUserChange } from '../features/userSlice';
import { useLogContactMutation, useGetContactQuery } from '../services/apiAuth'


function Signin() {

  //store & global variables
  const authy = useSelector((state) => state.authy)
  const user = useSelector((state) => state.user)

  //hooks
  const dispatch = useDispatch()

  //queries
  const [logContact] = useLogContactMutation();


  const logHandler = async () => {
    if (authy.authy.email === undefined) {
      return;
    } else {
      const retour = await logContact(authy.authy)
      if (retour.error) {
        return alert(retour.error.data.message)
      } else {
        console.log(retour, "")
        localStorage.setItem("ownTokken", retour.data.accessToken)
        const token = retour.data.accessToken
        dispatch(clearUserChange())
        fetch(`http://localhost:3000/widgets/me`, { method: 'GET', headers: { 'authorization': `Bearer ${token}` }, })
          .then(response => response.json())
          .then(data => {
            console.log(data[0])
            dispatch(addUserChange(data[0].widgets))
          });
        localStorage.setItem("isAuth", true)
      }
      dispatch(addAuthy({}))
    }
    console.log(user, 'oku')
  }

  useEffect(function () {
    if (authy.authy.email === undefined) { return; } else { logHandler() }
  }, [authy])


  const handleSubmit = (values, { props, setSubmitting }) => {
    const final = '{"email": "' + values.email + '", "password": "' + values.password + '"}'
    console.log(final)
    console.log(JSON.parse(final))
    dispatch(addAuthy(JSON.parse(final)))
    setSubmitting(false);
    return;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => {
          let errors = {};
          if (!values.password || !values.email || values.password.length < 8 || !values.email.includes('@'))
            errors.password = "not adapted credentials"
          return errors;
        }}
        onSubmit={handleSubmit}
        render={formProps => {
          return (

            <Form>
              <h2>Login</h2>
              <Field
                type="text"
                name="email"
                placeholder="Email address"
              />
              <ErrorMessage name="email" />
              <br />
              <Field
                type="text"
                name="password"
                placeholder="Mot de Passe - MIN 8 caracteres MAX 20 caracteres"
              />
              <ErrorMessage name="password" />
              <br />
              <br />
              <button
                type="submit"
                disabled={formProps.isSubmitting}>
                Login
              </button>
            </Form>
          );
        }}
      />
    </>
  )
}

export default Signin