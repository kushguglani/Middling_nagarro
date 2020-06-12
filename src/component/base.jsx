import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import HeaderMenu from './header-menu';
import Footer from './footer';
import { withRouter } from 'react-router-dom';
import { createArticle, inputSearch } from "../redux/action/feed";
import { changeActiveHeaderItem, logout } from "../redux/action/user";

const Base = (props) => {
    const headerMenuClick = (e, { name }) => {
        props.changeActiveHeaderItem(name)
        props.history.push("/" + name)
    }

    const { isUserLogin, location, userDetails, activeHeaderItem,
         searchValue, logout, inputSearch } = props;

         
    const userButtonClicked = ()=>{
        props.history.push("/user/" + userDetails.username)

    }
    return (
        <div>
            <HeaderMenu
                handleItemClick={headerMenuClick} location={location.pathname}
                activeItem={activeHeaderItem} isUserLogin={isUserLogin} searchValue={searchValue}
                userDetails={userDetails} logout={logout} inputSearch={inputSearch}
                userButtonClicked={userButtonClicked} />
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
        searchValue: state.userFeeds.searchValue
    }
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({
        createArticle,
        changeActiveHeaderItem,
        logout,
        inputSearch
    }, dispatch)
}

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(Base));