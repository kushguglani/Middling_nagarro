import React, { Component } from 'react';
import { Input, Menu, Button, Icon, Image } from 'semantic-ui-react';

export default class HeaderMenu extends Component {
    render() {
    const { activeItem, handleItemClick,
      userDetails, location, isUserLogin, logout,inputSearch } = this.props
  
    return (
      <div>

        <h2 className="header-logo">Middling <span className="header-title">
          (Diverse array of stories, ideas, and perspectives)</span></h2>
        <Menu pointing>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Menu >
            <Menu.Item
              className={location === "/login" ? "displayNone" : ""}
            >
              <Input icon='search' placeholder='Search feed by Title'
               onChange={(e)=>inputSearch(e.target.value)} />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Item position='right'
            name='newArticle'
            active={activeItem === 'newArticle'}

            className={!isUserLogin ? "displayNone" : ""}
            onClick={handleItemClick}
          >
            <Icon name='edit' />
            New Article
          </Menu.Item>
          <Menu.Item
            name='settings'
            active={activeItem === 'settings'}

            className={!isUserLogin ? "displayNone" : ""}
            onClick={handleItemClick}
          >
            <Icon name='settings' />
            Setting
          </Menu.Item>
          <Menu.Item
            name='user'
            active={activeItem === 'user'}

            className={!isUserLogin ? "displayNone" : ""}
            onClick={handleItemClick}
          >
            {!userDetails.image && <Icon name='user' />}

            <Image src={userDetails.image}
              onError={i => i.target.style.display = 'none'} />
            {userDetails.username}
          </Menu.Item>
          <Menu.Item
            name='Logout'
            active={activeItem === 'Logout'}

            className={!isUserLogin ? "displayNone" : ""}
            onClick={logout}
          >
            <Icon name='sign-out' />
            Logout
          </Menu.Item>
          <Menu.Item position="right"
            name='login'
            active={activeItem === 'login'}

            className={isUserLogin ? "displayNone" : ""}
            onClick={handleItemClick}
          >
            <Button primary>Log-in</Button>
          </Menu.Item>
          {/* <Menu.Item 
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
          ><Button primary>Sign up</Button></Menu.Item> */}

        </Menu>

      </div>
    )
  }
}