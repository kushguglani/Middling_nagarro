import React, { useState, useEffect } from 'react'
import { Input, TextArea, Button, Form, Message, Icon } from 'semantic-ui-react'
import { updateUserSettings } from "../redux/action/user";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect, withRouter } from 'react-router-dom';

function UserSettings(props) {
    const { bio, email, image, username } = props.user;
    const [userDetails, setUSerDetails] =
        useState({ bio, email, image, username, password: "" })

    if (!props.isUserLogin) props.history.push(`/`)
    if (userDetails.bio === null) setUSerDetails({ ...userDetails, bio: "" })
    if (userDetails.image === null) setUSerDetails({ ...userDetails, image: "" })
    const handleInputChnage = (event, { name }) => {
        const { value } = event.target
        setUSerDetails({ ...userDetails, [name]: value })
    }
    const updateSettings = () => {
        const data = { ...userDetails };
        if (data.password === "")
            delete data.password
        props.updateUserSettings(
            { Authorization: "Token " + props.jwt }, data)

    }
    if (props.redirectTo != "") {
        return <Redirect to={props.redirectTo} />;
    }
    let msz = "";
    if (props.updateUserMsz.length) {
        if (props.updateUserMsz[0] !== "User Updated") {
            msz = <Message
                visible
                error
                header='There was some errors with your submission'
                list={
                    props.updateUserMsz
                }

            />
        }
        else {
            msz = <Message
                visible
                positive
                header='User Updated Successfully'


            />
        }

    }
    return (
        <div className="userSettings createArticle">
            <Form>
                <Input
                    value={userDetails.image}
                    fluid icon='attach' iconPosition='left' name="image" onChange={handleInputChnage}
                    placeholder='URL of profile picture' className="createArticleHeight" />
                <Input fluid icon='user' name="username" onChange={handleInputChnage}
                    iconPosition='left' placeholder="user ID" value={userDetails.username} />
                <TextArea placeholder="Shot bio about you" rows="6"
                    value={userDetails.bio} name="bio" onChange={handleInputChnage} />
                <Input value={userDetails.email}
                    fluid icon='at' iconPosition='left' name="email" onChange={handleInputChnage}
                    placeholder='Eamil' className="createArticleHeight" />
                <Input type="password"
                    fluid icon='lock' iconPosition='left' name="password" onChange={handleInputChnage}
                    placeholder='Password' className="createArticleHeight" />
            </Form>
            <Button content='Update Settings' icon='right arrow'
                labelPosition='right'
                onClick={updateSettings} />

            {msz}
        </div>
    )
}

function initMapStateToProps(state) {
    return {
        jwt: state.user.user.token,
        user: state.user.user,
        redirectTo: state.userFeeds.redirectTo,
        updateUserMsz: state.user.updateUserMsz,
        isUserLogin: state.user.isUserLogin,
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUserSettings
    }, dispatch)
}

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(UserSettings));