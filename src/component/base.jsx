import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import HeaderMenu from './header-menu';
import Footer from './footer';
import { withRouter } from 'react-router-dom';
import {  inputSearch } from "../redux/action/feed";
import { changeActiveHeaderItem, logout } from "../redux/action/user";

const Base = (props) => {
    const headerMenuClick = (e, { name }) => {
        props.changeActiveHeaderItem(name)
        props.history.push("/" + name)
    }

    const { isUserLogin, location, userDetails, activeHeaderItem,editArticle,
         searchValue, logout, inputSearch } = props;

         
    const userButtonClicked = (e, { name })=>{
        props.changeActiveHeaderItem(name)
        props.history.push("/user/" + userDetails.username)

    }
    const onLogout = ()=>{
        
        props.history.push("/login")
        props.logout()

    }
    useEffect(()=>{
        if(Object.keys(editArticle).length > 0 && props.location.pathname !== "/newArticle"){
            // props.history.push("/newArticle")
    
        }

    })
    return (
        <div>
            <HeaderMenu
                handleItemClick={headerMenuClick} location={location.pathname}
                activeItem={activeHeaderItem} isUserLogin={isUserLogin} searchValue={searchValue}
                userDetails={userDetails} logout={onLogout} inputSearch={inputSearch}
                userButtonClicked={userButtonClicked} editArticle={editArticle} />
            {props.children}
            <Footer />
        </div>
    )
}
function initMapStateToProps(state) {
    return {
        isUserLogin: state.user.isUserLogin,
        userDetails: state.user.user,
        activeHeaderItem: state.user.activeHeaderItem,
        feeds: state.userFeeds.feeds,
        searchValue: state.userFeeds.searchValue,
        editArticle: state.userFeeds.editArticle
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeActiveHeaderItem,
        logout,
        inputSearch
    }, dispatch)
}

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(Base));