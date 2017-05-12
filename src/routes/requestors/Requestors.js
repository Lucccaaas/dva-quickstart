/**
 * Created by yunge on 16/10/28.
 */
import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./Requestors.less";
import RequestorList from "../../components/Requestors/RequestorList.jsx";
import RequestorSearch from "../../components/Requestors/RequestorSearch.jsx";
import RequestorModal from "../../components/Requestors/RequestorModal.jsx";
import {Breadcrumb} from 'antd';


function Requestors ({location, dispatch, requestors}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = requestors;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `requestors/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'requestors/hideModal',
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
                pathname: '/requestors',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'requestors/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'requestors/showModal',
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
                type: 'requestors/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'requestors/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const RequestorModalGen = () =>
        <RequestorModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/requestors">调用方信息表</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <RequestorSearch {...userSearchProps} />
            <RequestorList {...userListProps} />
            <RequestorModalGen />
        </div>
    );
}

Requestors.propTypes = {
    requestors: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({requestors}) {
    return {requestors};
}

export default connect(mapStateToProps)(Requestors);