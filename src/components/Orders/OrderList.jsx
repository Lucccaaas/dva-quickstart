import React, {PropTypes} from 'react';
import {Table, Popconfirm, Pagination} from 'antd';

function ChannelList ({
    total, current, loading, dataSource,
    onPageChange,
    onDeleteItem,
    onEditItem,
}) {
    const columns = [{
        title: '订单流水号',
        dataIndex: 'bizId',
        key: 'orderId',
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '商户流水号',
        dataIndex: 'merchantNo',
        key: 'merchantNo'
    }, {
        title: '调用方渠道',
        dataIndex: 'requestor.name',
        key: 'requestor',
    }, {
        title: '渠道',
        dataIndex: 'channel.name',
        key: 'channel',
    }, {
        title: '返回状态码',
        dataIndex: 'result',
        key: 'result',
    }, {
        title: '返回结果',
        dataIndex: 'resultMessage',
        key: 'resultMessage'
    }, {
        title: '银行',
        dataIndex: 'bank.name',
        key: 'bank',
    }, {
        title: '银行卡号' ,
        dataIndex: 'cardNum',
        key: 'cardNum'
    }, {
        title: '是否启用',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            return <p>
                {text === 1 ? '是' : '否'}
            </p>
        }
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

ChannelList.propTypes = {
    onPageChange: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    dataSource: PropTypes.array,
    loading: PropTypes.any,
    total: PropTypes.any,
    current: PropTypes.any,
};

export default ChannelList;
