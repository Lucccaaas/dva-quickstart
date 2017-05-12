import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./ReqChannelRels.less";
import ReqChannelRelList from "../../components/ReqChannelRels/ReqChannelRelList.jsx";
import ReqChannelRelSearch from "../../components/ReqChannelRels/ReqChannelRelSearch.jsx";
import ReqChannelRelModal from "../../components/ReqChannelRels/ReqChannelRelModal.jsx";
import {Breadcrumb} from 'antd';

function ReqChannelRels ({location, dispatch, requestorChannelRels}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = requestorChannelRels;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `requestorChannelRels/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'requestorChannelRels/hideModal',
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
                pathname: '/requestorChannelRels',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'requestorChannelRels/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'requestorChannelRels/showModal',
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
                type: 'requestorChannelRels/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'requestorChannelRels/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const ReqChannelRelGen = () =>
        <ReqChannelRelModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/requestorChannelRels">requestorChannelRels</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <ReqChannelRelSearch {...userSearchProps} />
            <ReqChannelRelList {...userListProps} />
            <ReqChannelRelGen />
        </div>
    );
}

ReqChannelRels.propTypes = {
    requestorChannelRels: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({requestorChannelRels}) {
    return {requestorChannelRels};
}

export default connect(mapStateToProps)(ReqChannelRels);