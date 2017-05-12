import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./index.less";
import ReqChannelBankRelList from "../../components/ReqChannelBankRels/ReqChannelBankRelList";
import ReqChannelBankRelSearch from "../../components/ReqChannelBankRels/ReqChannelBankRelSearch";
import ReqChannelBankRelModal from "../../components/ReqChannelBankRels/ReqChannelBankRelModal";
import {Breadcrumb} from 'antd';

function ReqChannelBankRels ({location, dispatch, requestorChannelBankRels}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = requestorChannelBankRels;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `requestorChannelBankRels/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'requestorChannelBankRels/hideModal',
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
                pathname: '/requestorChannelBankRels',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'requestorChannelBankRels/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'requestorChannelBankRels/showModal',
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
                type: 'requestorChannelBankRels/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'requestorChannelBankRels/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const ModalGen = () =>
        <ReqChannelBankRelModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/requestorChannelBankRels">ReqChannelBankRels</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <ReqChannelBankRelSearch {...userSearchProps} />
            <ReqChannelBankRelList {...userListProps} />
            <ModalGen />
        </div>
    );
}

ReqChannelBankRels.propTypes = {
    requestorChannelBankRels: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({requestorChannelBankRels}) {
    return {requestorChannelBankRels};
}

export default connect(mapStateToProps)(ReqChannelBankRels);