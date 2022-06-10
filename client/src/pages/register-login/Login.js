import {useState} from 'react'
import { Alert, Button, Form } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import { loginUser, postUser } from '../../helpers/axiosHelper'
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const navigation = useNavigate()
const [form, setForm] = useState({})
const [response, setResponse] = useState({
	status: "",
	message: "",
})

const handleOnChange = e => {
	const {name, value} = e.target

	setForm({
		...form,
		[name]: value
	})
}

const handleOnSubmit = async e =>{
	e.preventDefault()
	
	const res = await loginUser(form)
	console.log(res)
	if(res.status === "success"){
		window.sessionStorage.setItem("user", JSON.stringify(res.user) )
		navigation("/dashboard")
		return
	}  
	setResponse(res) 

}

const inputField = [
	{
		name: "email",
		lable: "Email address",
		type: "email",
		required: true,

	},
	{
		name: "password",
		lable: "Password",
		type: "password",
		required: true,

	},
]

  return (
      <Layout>
        <div className="center">
					
				<Form onSubmit={handleOnSubmit}>
					<h3>Welcome Back!</h3>
					<hr />

					{
					 response.message && <Alert variant={ response.status === 'success' ? 'success' : 'danger'}>{response.message}</Alert>
					}
				

				{
					inputField.map(({lable, ...rest}, i)=> <Form.Group key={i} className="mb-3" controlId="formGroupEmail">
					<Form.Label>{lable}</Form.Label>
					<Form.Control onChange={handleOnChange}  placeholder={lable} {...rest}/>
				</Form.Group>)
				}



				<Form.Group className="mb-3" controlId="formGroupPassword">
				 <Button variant="primary" type="submit">Login</Button>
				</Form.Group>

				<div className="text-end">
					<p>Don't have an account yet? <Link to="/register">Sign Up</Link></p>
				</div>
			</Form>
					
					</div>  
			     
      </Layout>
    
  )
}
