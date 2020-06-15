import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ShowModal = (props) => (
  <Modal open basic size='small'>
    <Header icon='archive' content='Delete Article' />
    <Modal.Content>
      <p>
        Are you sure you wants to delete article {props.article.title} ?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick ={props.noClicked}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted onClick={props.yesClicked}> 
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default ShowModal