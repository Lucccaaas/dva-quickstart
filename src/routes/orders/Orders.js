/**
 * Created by yunge on 16/11/2.
 */
import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./Orders.less";
import OrderList from "../../components/Orders/OrderList.jsx";
import OrderSearch from "../../components/Orders/OrderSearch.jsx";
import OrderModal from "../../components/Orders/OrderModal.jsx";
import {Breadcrumb} from 'antd';

function Orders ({location, dispatch, orders}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = orders;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `orders/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'orders/hideModal',
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
                pathname: '/orders',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'orders/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'orders/showModal',
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
                type: 'orders/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'orders/showModal',
                payload: {
                    modalType: 'create',
                },
            });
        },
    };

    // 解决 Form.create initialValue 的问题
    // 每次创建一个全新的组件, 而不做diff
    // 如果你使用了redux, 请移步 http://react-component.github.io/form/examples/redux.html
    const OrderGen = () =>
        <OrderModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/orders">Orders</Link></Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <OrderSearch {...userSearchProps} />
            <OrderList {...userListProps} />
            <OrderGen />
        </div>
    );
}

Orders.propTypes = {
    orders: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({orders}) {
    return {orders};
}

export default connect(mapStateToProps)(Orders);