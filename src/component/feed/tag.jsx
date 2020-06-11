import React from 'react'
import { Label, Segment, Header, Divider } from 'semantic-ui-react'
import Spinner from '../loader';

export const TagList = (props) => {

    let tagList;
    if (props.tags) {
        tagList = props.tags.map((curr, i) =>
            <Label key={i} className="tag-cursor" onClick={()=>props.fetchConditionalFeeds("tag",curr)}>{curr}</Label>
        )
    }
    return (


        <Segment>
            <Header as='h2' floated='right'>
                Popular Tags
            </Header>

            <Divider clearing />
            <Label.Group tag>
                
            {props.tagLoader ?
                    <Spinner text="Fetching Tags" /> : tagList}
             
            </Label.Group>
        </Segment>
    )



}