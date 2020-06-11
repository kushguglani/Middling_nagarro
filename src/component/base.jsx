import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import HeaderMenu from './header-menu';
import Footer from './footer';
import { withRouter } from 'react-router-dom';
import { createArticle,inputSearch } from "../redux/action/feed";
import { changeActiveHeaderItem, logout } from "../redux/action/user";

class Base extends Component {
    state = { activeItem: 'home' }


    headerMenuClick = (e, { name }) => {
        this.props.changeActiveHeaderItem(name)
        this.props.history.push("/" + name)
    }
    render() {
        const { isUserLogin, location, userDetails, activeHeaderItem, logout,inputSearch } = this.props;
        // const { match, location, history } = this.props;

        return (
            <div>
                <HeaderMenu
                    handleItemClick={this.headerMenuClick} location={location.pathname}
                    activeItem={activeHeaderItem} isUserLogin={isUserLogin}
                    userDetails={userDetails} logout={logout} inputSearch = {inputSearch}/>
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

function initMapStateToProps(state) {
    return {
        isUserLogin: state.user.isUserLogin,
        userDetails: state.user.user,
        activeHeaderItem: state.user.activeHeaderItem,
        feeds:state.userFeeds.feeds
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