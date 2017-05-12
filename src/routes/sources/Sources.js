/**
 * Created by yunge on 16/11/8.
 */
import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import UserList from "../../components/Sources/SourceList";
import UserSearch from "../../components/Sources/SourceSearch";
import UserModal from "../../components/Sources/SourceModal";
import {Breadcrumb} from 'antd';

const styles = {

};
function Sources ({location, dispatch, sources}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = sources;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `sources/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'sources/hideModal',
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
                pathname: '/sources',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'sources/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'sources/showModal',
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
                type: 'sources/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'sources/showModal',
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
                <Breadcrumb.Item><Link to="/sources">Sources</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <UserSearch {...userSearchProps} />
            <UserList {...userListProps} />
            <UserModalGen />
        </div>
    );
}

Sources.propTypes = {
    sources: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({sources}) {
    return {sources};
}

export default connect(mapStateToProps)(Sources);