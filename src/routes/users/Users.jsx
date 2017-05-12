import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./Users.less";
import UserList from "../../components/Users/UserList.jsx";
import UserSearch from "../../components/Users/UserSearch.jsx";
import UserModal from "../../components/Users/UserModal.jsx";
import {Breadcrumb} from 'antd';

function Users ({location, dispatch, users}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = users;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `users/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'users/hideModal',
            });
        },
    };

    const userListProps = {
        dataSource: list,
        loading,
        total,
        current,
        onPageChange(page) {
            dispatch(routerRedux.push({
                pathname: '/users',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'users/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'users/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                },
            });
        },
    };

    const userSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue) {
            dispatch({
                type: 'users/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'users/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const UserModalGen = () =>
        <UserModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/users">Users</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <UserSearch {...userSearchProps} />
            <UserList {...userListProps} />
            <UserModalGen />
        </div>
    );
}

Users.propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({users}) {
    return {users};
}

export default connect(mapStateToProps)(Users);