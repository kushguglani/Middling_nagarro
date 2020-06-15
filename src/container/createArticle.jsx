import React, { useState, useEffect } from 'react'
import { Input, TextArea, Button, Message, Form, Label, Icon } from 'semantic-ui-react'
import { createArticleAction, submitEditArticle } from "../redux/action/feed";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect, withRouter } from 'react-router-dom';
import { createArticleConstant } from '../utils/feedConstant';

function CreateArticle(props) {
    const [updateResponse, setResponse] = useState(false)
    const [tagList, setTags] = useState([])
    const [error, setError] = useState([])
    const [buttonContent, setButtonContent] = useState(createArticleConstant.publishAricleContant)
    const [articleDetails, setArticleDetails] = useState({ title: "", description: "", body: "", tagList })
    const { jwt } = props;
    const handleKeyChange = event => {
        const { value } = event.target
        if (event.key === 'Enter') {
            if (value === "") {
                setError(["Tag can not be empty"]);
            }
            else if (tagList.indexOf(value) !== -1) {
                setError(["Tag is already added"]);
            }
            else {
                setError([])
                setTags([...tagList, value]);
                event.target.value = "";
            }
        }
    }

    useEffect(() => {
        if (Object.keys(props.editArticle).length > 0
            && props.editArticle.title !== articleDetails.title) {

            if (props.editedArticle.edited === "done") props.history.push("/")
            else {
                setButtonContent(createArticleConstant.editArticleContsant)
                const { title, description, body, tagList } = props.editArticle
                setArticleDetails({
                    title, description, body, tagList
                })
                setTags(tagList)
            }
        }
    }, [buttonContent])

    useEffect(() => {

        setTags(tagList)
        setArticleDetails({ ...articleDetails, tagList })
    }, [tagList.join("")])



    const handleInputChnage = (event, { name }) => {
        const { value } = event.target

        setArticleDetails({ ...articleDetails, [name]: value })
    }
    const publishAricle = () => {
        if ((Object.keys(props.editArticle).length > 0)) {
            if (props.editedArticle.edited === "done") props.history.push("/")
            props.submitEditArticle({ article: articleDetails },
                { Authorization: "Token " + jwt },
                props.editArticle.slug
            )
        } else {

            createArticleAction({ article: articleDetails },
                { Authorization: "Token " + jwt }, props.username)
                .then(res => {
                    console.log(res);
                    setResponse(true);
                    setError([]);
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response) {
                        const errorCode = err.response.data.errors;

                        const errorList = []
                        for (const error in errorCode) {
                            errorList.push(`${error} ${errorCode[error]}`)
                        }
                        setError(errorList)
                        setResponse(false);
                    }
                })
        }

    }
    const deleteTag = (tag) => {
        let index = tagList.indexOf(tag);
        let arrayTag = [...tagList]
        if (index > -1) {
            arrayTag.splice(index, 1);
            setTags(arrayTag)
        }


    }
    if (props.redirectTo !== "") {
        return <Redirect to={props.redirectTo} />;
    }

    if (props.editedArticle.edited === "done") {
        return <Redirect to="/" />;

    }
    console.log(updateResponse+"qweruyio");
    
    return (
        <div className="createArticle">
            <Form>
                <Input
                    value={articleDetails.title}
                    fluid icon='file' iconPosition='left' name="title" onChange={handleInputChnage}
                    placeholder='Article Titile' className="createArticleHeight" />
                <Input
                    value={articleDetails.description} fluid icon='info' name="description" onChange={handleInputChnage}
                    iconPosition='left' placeholder="What's this article about?" />
                <TextArea
                    value={articleDetails.body} placeholder="Write your article (in markdown)" rows="6" name="body" onChange={handleInputChnage} />
                <Input fluid
                    icon='tags'
                    iconPosition='left'
                    placeholder='Enter tags'
                    onKeyDown={handleKeyChange}
                />

                <Label.Group className="tag-label-group" tag>
                    {
                        tagList.length > 0 && tagList.map((curr, i) =>
                            <Label key={i} >
                                {curr}
                                <Icon name='delete' onClick={() => deleteTag(curr)} />
                            </Label>
                        )
                    }
                </Label.Group>
            </Form>
            <Button content={buttonContent} icon='right arrow'
                labelPosition='right'
                onClick={publishAricle} />
            {error.length > 0 && <Message
                visible
                error
                header='There was some errors with your submission'
                list={
                    error
                }
            />
            }
            {updateResponse === true &&
                <Message
                    visible
                    positive
                    header='Article Published Successfully'
                />

            }
        </div>
    )
}

function initMapStateToProps(state) {
    return {
        jwt: state.user.user.token,
        username: state.user.user.username,
        redirectTo: state.userFeeds.redirectTo,
        editArticle: state.userFeeds.editArticle,
        editedArticle: state.userFeeds.editedArticle
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({

        submitEditArticle
    }, dispatch)
}

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(CreateArticle));