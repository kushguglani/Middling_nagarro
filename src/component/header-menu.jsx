import React from 'react';
import { Input, Menu, Button, Icon, Image } from 'semantic-ui-react';

import { projectName, header } from '../utils/userConstant'

const HeaderMenu = props => {
  const { activeItem, handleItemClick, editArticle,
    userDetails, location, isUserLogin, logout, inputSearch, searchValue, userButtonClicked } = props
  const { title, description } = projectName
  const { new_article,
    setting,
    log_out,
    edit_article,
    signin } = header;
    console.log(location === "home");
    console.log(location === "/");
    console.log(location);
    
    
  return (
    <>
      <h2 className="header-logo">{title} <span className="header-title">
        {description}</span></h2>
      <Menu pointing>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Menu >
          <Menu.Item
            className={location === "/home" || location === "/" || activeItem ==="user" ? "" : "displayNone"}
          >
            <Input icon='search' placeholder='Search feed by Title' value={searchValue}
              onChange={(e) => inputSearch(e.target.value)} />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item position='right'
          name='newArticle'
          active={activeItem === 'newArticle'}

          className={!isUserLogin ? "displayNone" : ""}
          onClick={handleItemClick}
        >
          <Icon name='edit' />
          {Object.keys(editArticle).length > 0 ? edit_article : new_article}
        </Menu.Item>
        <Menu.Item
          name='settings'
          active={activeItem === 'settings'}

          className={!isUserLogin ? "displayNone" : ""}
          onClick={handleItemClick}
        >
          <Icon name='settings' />
          {setting}
        </Menu.Item>
        <Menu.Item
          name='user'
          active={activeItem === 'user'}

          className={!isUserLogin ? "displayNone" : ""}
          onClick={userButtonClicked}
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
          {log_out}
        </Menu.Item>
        <Menu.Item position="right"
          name='login'
          active={activeItem === 'login'}

          className={isUserLogin ? "displayNone" : ""}
          onClick={handleItemClick}
        >
          <Button primary>{signin}</Button>
        </Menu.Item>
        {/* <Menu.Item 
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
          ><Button primary>Sign up</Button></Menu.Item> */}

      </Menu>
    </>
  )
}

export default HeaderMenu;