import React, { useState, useEffect } from 'react'
import { Input, TextArea, Button, Form, Label, Icon } from 'semantic-ui-react'
import { createArticle } from "../redux/action/feed";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom'

function CreateArticle(props) {
    const [tagList, setTags] = useState([])
    const [articleDetails, setArticleDetails] = useState({ title: "", description: "", body: "", tagList })
    const { createArticle, jwt } = props;
    const handleKeyChange = event => {
        const { value } = event.target
        if (event.key === 'Enter') {
            if (value === "") {
                console.log("tag can't be empty");
            }
            else if (tagList.indexOf(value) !== -1) {
                console.log("tag already addes");
            }
            else {
                setTags([...tagList, value]);
                event.target.value = "";
            }
        }
    }
    useEffect(() => {
        setArticleDetails({ ...articleDetails, tagList })
    }, [tagList.join("")])
    const handleInputChnage = (event, { name }) => {
        const { value } = event.target
        setArticleDetails({ ...articleDetails, [name]: value })
    }
    const publishAricle = () => {
        createArticle({ article: articleDetails },
            { Authorization: "Token " + jwt }, props.username)

    }
    if (props.redirectTo != "") {
        return <Redirect to={props.redirectTo} />;
    }
    return (
        <div className="createArticle">
            <Form>
                <Input
                    fluid icon='file' iconPosition='left' name="title" onChange={handleInputChnage}
                    placeholder='Article Titile' className="createArticleHeight" />
                <Input fluid icon='info' name="description" onChange={handleInputChnage}
                    iconPosition='left' placeholder="What's this article about?" />
                <TextArea placeholder="Write your article (in markdown)" rows="6" name="body" onChange={handleInputChnage} />
                <Input fluid
                    icon='tags'
                    iconPosition='left'
                    label={{ tag: true, content: 'Add Tag' }}
                    labelPosition='right'
                    placeholder='Enter tags'
                    onKeyDown={handleKeyChange}
                />

                <Label.Group className="tag-label-group" tag>
                    {
                        tagList.length > 0 && tagList.map((curr, i) =>
                            <Label key={i} >
                                {curr}
                                <Icon name='delete' />
                            </Label>
                        )
                    }
                </Label.Group>
            </Form>
            <Button content='Publish Article' icon='right arrow'
                labelPosition='right'
                onClick={publishAricle} />
        </div>
    )
}

function initMapStateToProps(state) {
    return {
        jwt: state.user.user.token,
        username: state.user.user.username,
        redirectTo: state.userFeeds.redirectTo
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        createArticle
    }, dispatch)
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CreateArticle);