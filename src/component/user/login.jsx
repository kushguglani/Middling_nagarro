import React, { useState } from 'react';
import { Button, Form, Input, Checkbox } from 'semantic-ui-react';

import {buttonConstant} from '../../utils/userConstant'

const FormExampleForm = (props) => {
  const [loginObject, setLoginObject] = useState({ email: "", password: "" });
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setLoginObject({
      ...loginObject,
      [name]: value
    })
  }
  const { userLogin } = props
  return (
    <Form>
      <Form.Field>
        <Input type="email" icon='at' iconPosition='left' name="email" onChange={handleInputChange} placeholder='Email' />
      </Form.Field>
      <Form.Field>
        <Input type="password" icon='lock' iconPosition='left' name="password" onChange={handleInputChange} placeholder='Password' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='Remember Me' />
      </Form.Field>
      <Button onClick={() => userLogin(loginObject)} type='submit'>{buttonConstant.signin}</Button>

    </Form>

  )
}
export default FormExampleForm