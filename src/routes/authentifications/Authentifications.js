import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./Authentifications.less";
import AuthentificationList from "../../components/Authens/AuthenList.jsx";
import AuthentificationSearch from "../../components/Authens/AuthenSearch.jsx";
import AuthentificationModal from "../../components/Authens/AuthenModal.jsx";
import {Breadcrumb} from 'antd';

function Authentifications ({location, dispatch, authentifications}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = authentifications;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `authentifications/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'authentifications/hideModal',
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
                pathname: '/authentifications',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'authentifications/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'authentifications/showModal',
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
                type: 'authentifications/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'authentifications/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const AuthentificationGen = () =>
        <AuthentificationModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/authentifications">Authentifications</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <AuthentificationSearch {...userSearchProps} />
            <AuthentificationList {...userListProps} />
            <AuthentificationGen />
        </div>
    );
}

Authentifications.propTypes = {
    authentifications: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({authentifications}) {
    return {authentifications};
}

export default connect(mapStateToProps)(Authentifications);