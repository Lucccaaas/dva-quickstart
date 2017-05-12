import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./ChannelBankRels.less";
import ChannelBankRelList from "../../components/ChannelBankRels/ChannelBankRelList.jsx";
import ChannelBankRelSearch from "../../components/ChannelBankRels/ChannelBankRelSearch.jsx";
import ChannelBankRelModal from "../../components/ChannelBankRels/ChannelBankRelModal.jsx";
import {Breadcrumb} from 'antd';

function ChannelBankRels ({location, dispatch, channelBankRels}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = channelBankRels;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `channelBankRels/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'channelBankRels/hideModal',
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
                pathname: '/channelBankRels',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'channelBankRels/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'channelBankRels/showModal',
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
                type: 'channelBankRels/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'channelBankRels/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const ChannelBankRelGen = () =>
        <ChannelBankRelModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/channelBankRels">ChannelBankRels</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <ChannelBankRelSearch {...userSearchProps} />
            <ChannelBankRelList {...userListProps} />
            <ChannelBankRelGen />
        </div>
    );
}

ChannelBankRels.propTypes = {
    channelBankRels: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({channelBankRels}) {
    return {channelBankRels};
}

export default connect(mapStateToProps)(ChannelBankRels);