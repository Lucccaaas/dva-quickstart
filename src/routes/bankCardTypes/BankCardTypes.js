import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./BankCardTypes.less";
import BankCardTypeList from "../../components/bankCardTypes/bankCardTypeList";
import BankCardTypeSearch from "../../components/bankCardTypes/bankCardTypeSearch";
import BankCardTypeModal from "../../components/bankCardTypes/bankCardTypeModal";
import {Breadcrumb} from 'antd';

function bankCardTypes ({location, dispatch, bankCardTypes}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = bankCardTypes;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `bankCardTypes/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'bankCardTypes/hideModal',
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
                pathname: '/bankCardTypes',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'bankCardTypes/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'bankCardTypes/showModal',
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
                type: 'bankCardTypes/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'bankCardTypes/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const BankCardTypeGen = () =>
        <BankCardTypeModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/bankCardTypes">bankCardTypes</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <BankCardTypeSearch {...userSearchProps} />
            <BankCardTypeList {...userListProps} />
            <BankCardTypeGen />
        </div>
    );
}

bankCardTypes.propTypes = {
    bankCardTypes: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({bankCardTypes}) {
    return {bankCardTypes};
}

export default connect(mapStateToProps)(bankCardTypes);