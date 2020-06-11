import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const Spinner = (props) => (
    <div>
        <Segment className="ui-segment">
            <Dimmer active inverted>
                <Loader content={props.text} inverted indeterminate/>
                
            </Dimmer>
        </Segment>
    </div>
)

export default Spinner

