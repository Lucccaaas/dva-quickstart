/**
 * Created by yunge on 16/11/8.
 */
import React, {PropTypes} from "react";
import {routerRedux, Link} from "dva/router";
import {connect} from "dva";
import styles from "./index.less";
import WithHoldingList from "../../components/Withholding/WithHoldingList";
import WithHoldingSearch from "../../components/Withholding/WithHoldingSearch";
import WithHoldingModal from "../../components/Withholding/WithHoldingModal";

function WithHoldings ({location, dispatch, withHoldings}) {
    const {
        loading, list, total, current, field, keyword,
        currentItem, modalVisible, modalType,
    } = withHoldings;

    const userModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `withHoldings/${modalType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: 'withHoldings/hideModal',
            });
        }
    };

    const userListProps = {
        dataSource: list,
        loading,
        total,
        current,
        onPageChange(page) {
            dispatch(routerRedux.push({
                pathname: '/withHoldings',
                query: {field, keyword, page},
            }));
        },
        onDeleteItem(id) {
            dispatch({
                type: 'withHoldings/delete',
                payload: id,
            });
        },
        onEditItem(item) {
            dispatch({
                type: 'withHoldings/showModal',
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
                type: 'withHoldings/query',
                payload: fieldsValue,
            });
        },
        onAdd() {
            dispatch({
                type: 'withHoldings/showModal',
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
        <WithHoldingModal {...userModalProps} />;

    return (
        <div className={styles.normal}>
            <br />
            <WithHoldingSearch {...userSearchProps} />
            <WithHoldingList {...userListProps} />
            <UserModalGen />
        </div>
    );
}

WithHoldings.propTypes = {
    withHoldings: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps ({withHoldings}) {
    return {withHoldings};
}

export default connect(mapStateToProps)(WithHoldings);