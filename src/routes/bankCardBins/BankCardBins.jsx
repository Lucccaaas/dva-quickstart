/**
 * Created by yunge on 16/10/28.
 */
import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./BankCardBins.less";
import BankCardBinList from "../../components/BankCardBins/BankCardBinList.jsx";
import BankCardBinSearch from "../../components/BankCardBins/BankCardBinSearch.jsx";
import BankCardBinModal from "../../components/BankCardBins/BankCardBinModal";
import {Breadcrumb} from "antd";


function BankCardBins ({location, dispatch, bankCardBins}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = bankCardBins;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `bankCardBins/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'bankCardBins/hideModal',
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
                pathname: '/bankCardBins',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'bankCardBins/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'bankCardBins/showModal',
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
                type: 'bankCardBins/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'bankCardBins/showModal',
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
        <BankCardBinModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/bankCardBins">银行卡信息表</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <BankCardBinSearch {...userSearchProps} />
            <BankCardBinList {...userListProps} />
            <ModalGen />
        </div>
    );
}

BankCardBins.propTypes = {
    banks: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({bankCardBins}) {
    return {bankCardBins};
}

export default connect(mapStateToProps)(BankCardBins);