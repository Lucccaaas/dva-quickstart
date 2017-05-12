/**
 * Created by yunge on 16/10/28.
 */
import {Menu, Icon, Switch} from 'antd';
import React, {PropTypes} from 'react';
import {Link} from "dva/router";
import apiConfig from  "../../services/config";
const {entityTypeConfig} = apiConfig;

const SubMenu = Menu.SubMenu;

class SiderLayout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            theme: 'dark',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }


    render () {
        const clzName = (key) => {
            return this.props.location.pathname === `/${key}`
                ? "ant-menu-item-selected"
                : "";
        };
        const menus = Object.keys(entityTypeConfig)
            .filter((key) => {
                const value = entityTypeConfig[key];
                return !!value.show;
            }).map((key) => {
                const value = entityTypeConfig[key];
                return <Menu.Item key={key} className={clzName(key)}>
                    <Link to={value.path}>{value.name}</Link>
                </Menu.Item>
            });
        return (
            <Menu theme={this.state.theme}
                  onClick={this.handleClick}
                  style={{width: 224}}
                  defaultOpenKeys={['sub1', 'sub2']}
                  selectedKeys={[this.state.current]}
                  mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="appstore"/><span>数据表</span></span>}>
                    {menus}
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="mail"/><span>配置管理</span></span>}>
                    <Menu.Item className={clzName("withholding")}>
                        <Link key="withholding" to="/withholding">代扣管理</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default SiderLayout;
