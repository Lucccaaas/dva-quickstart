/**
 * Created by yunge on 16/10/28.
 */
import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./Banks.less";
import BankList from "../../components/Banks/BankList.jsx";
import BankSearch from "../../components/Banks/BankSearch.jsx";
import BankModal from "../../components/Banks/BankModal.jsx";
import {Breadcrumb} from 'antd';


function Banks ({location, dispatch, banks}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = banks;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `banks/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'banks/hideModal',
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
                pathname: '/banks',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'banks/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'banks/showModal',
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
                type: 'banks/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'banks/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const BankModalGen = () =>
        <BankModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <BankSearch {...userSearchProps} />
            <BankList {...userListProps} />
            <BankModalGen />
        </div>
    );
}

Banks.propTypes = {
    banks: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({banks}) {
    return {banks};
}

export default connect(mapStateToProps)(Banks);