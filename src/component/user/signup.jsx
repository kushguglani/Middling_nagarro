import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'

import { buttonConstant } from '../../utils/userConstant'

const FormExampleForm = (props) => {

    const [signupFormObject, setSignupFormObject] = useState({ userName: "", email: "", password: "" });
    const [termsButton, setTermsButton] = useState(true)

    const handleInputChange = e => {
        let { name, value } = e.target;
        setSignupFormObject({
            ...signupFormObject,
            [name]: value
        })
    }
    const checkboxToggle = e => {
        setTermsButton(!termsButton)
    }
    return (
        <Form>
            <Form.Field>
                <Input icon='user' iconPosition='left' name="username" onChange={handleInputChange} placeholder='User Name' />
            </Form.Field>
            <Form.Field>
                <Input type="email" icon='at' iconPosition='left' name="email" onChange={handleInputChange} placeholder='Email' />
            </Form.Field>
            <Form.Field>
                <Input type="password" icon='lock' iconPosition='left' name="password" onChange={handleInputChange} placeholder='Password' />
            </Form.Field>
            <Form.Field>
                <Checkbox
                    onChange={checkboxToggle}
                    label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button
                onClick={() => props.userSignup(signupFormObject)}
                type='submit'
                disabled={termsButton}>
                {buttonConstant.signup}
            </Button>
        </Form>
    )
}
export default FormExampleForm