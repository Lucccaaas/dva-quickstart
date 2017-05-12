import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./Channels.less";
import ChannelList from "../../components/Channels/ChannelList.jsx";
import ChannelSearch from "../../components/Channels/ChannelSearch.jsx";
import ChannelModal from "../../components/Channels/ChannelModal.jsx";
import {Breadcrumb} from 'antd';

function Channels ({location, dispatch, channels}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = channels;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `channels/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'channels/hideModal',
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
                pathname: '/channels',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'channels/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'channels/showModal',
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
                type: 'channels/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'channels/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const ChannelGen = () =>
        <ChannelModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/channels">Channels</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <ChannelSearch {...userSearchProps} />
            <ChannelList {...userListProps} />
            <ChannelGen />
        </div>
    );
}

Channels.propTypes = {
    channels: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({channels}) {
    return {channels};
}

export default connect(mapStateToProps)(Channels);