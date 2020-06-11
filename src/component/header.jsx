import React from 'react'
import { Header } from 'semantic-ui-react'

const HeaderTitle = (props) => (
  <Header
    as='h1'
    textAlign='center'
    content={props.title}
    subheader={props.body}
    block
  />
)

export default HeaderTitle