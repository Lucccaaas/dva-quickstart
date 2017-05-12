import React, {PropTypes} from 'react';
import {Table, Popconfirm, Pagination} from 'antd';

function BankBinList ({
    total, current, loading, dataSource,
    onPageChange,
    onDeleteItem,
    onEditItem,
}) {
    const columns = [{
        title: 'bankCardBin',
        dataIndex: 'bankCardBin',
        key: 'bankCardBin',
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '银行卡类型',
        dataIndex: 'bankCardType.name',
        key: 'bankCardType',
    }, {
        title: '银行卡长度',
        dataIndex: 'cardLength',
        key: 'cardLength',
    }, {
        title: '银行',
        dataIndex: 'bank.name',
        key: 'bank',
    // }, {
    //     title: '已激活',
    //     dataIndex: 'isActive',
    //     key: 'isActive',
    //     render: (text, record) => {
    //         return text === 1 ? '是' : '否'
    //     }
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

BankBinList.propTypes = {
    onPageChange: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    total: PropTypes.any,
    current: PropTypes.any,
};

export default BankBinList;
