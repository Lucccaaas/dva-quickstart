/**
 * Created by yunge on 16/10/27.
 */
import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function getMenuKeyFromUrl(pathname) {
    let key = '';
    try {
        key = pathname.match(/\/([^\/]*)/i)[1];
        /* eslint no-empty:0 */
    } catch (e) {}
    return key;
}

function Header({ location }) {
    return (
        <Menu
            selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
            mode="horizontal"
            theme="dark"
        >
            <Menu.Item key="home">
                <Link to="/" target="_self"><Icon type="home" />拍拍贷</Link>
            </Menu.Item>
        </Menu>
    );
}

Header.propTypes = {
    location: PropTypes.object,
};

export default Header;