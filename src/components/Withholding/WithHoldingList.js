import React, {PropTypes} from 'react';
import {Table, Popconfirm, Pagination} from 'antd';

function WithHoldingList ({
    total, current, loading, dataSource,
    onPageChange,
    onDeleteItem,
    onEditItem,
}) {
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '银行编号',
        dataIndex: 'bankID',
        key: 'bankID',
    }, {
        title: '说明',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: '创建时间',
        dataIndex: 'insertTime',
        key: 'insertTime'
    }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
            <p>
                <a onClick={() => onEditItem(record)}>编辑</a>
                &nbsp;
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
                    <a>删除</a>
                </Popconfirm>
            </p>
        ),
    }];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
            />
            <Pagination
                className="ant-table-pagination"
                total={total}
                current={current}
                pageSize={10}
                onChange={onPageChange}
            />
        </div>
    );
}

WithHoldingList.propTypes = {
    onPageChange: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    total: PropTypes.any,
    current: PropTypes.any,
};

export default WithHoldingList;
