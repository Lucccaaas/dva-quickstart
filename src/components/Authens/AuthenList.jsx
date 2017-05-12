import React, {PropTypes} from 'react';
import {Table, Popconfirm, Pagination} from 'antd';

function ChannelList ({
    total, current, loading, dataSource,
    onPageChange,
    onDeleteItem,
    onEditItem,
}) {
    const columns = [{
        title: '编号',
        dataIndex: 'bizId',
        key: 'bizId',
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '订单编号',
        dataIndex: 'order.bizId',
        key: 'order',
    }, {
        title: '银行',
        dataIndex: 'bank.name',
        key: 'bank',
    }, {
        title: '银行卡号',
        dataIndex: 'cardNum',
        key: 'cardNum'
    }, {
        title: '渠道',
        dataIndex: 'channel.name',
        key: 'channel'
    }, {
        title: '调用方',
        dataIndex: 'requestor.name',
        key: 'requestor'
    }, {
        title: '鉴权结果',
        dataIndex: 'sign',
        key: 'sign',
        render: (text) => {
            return <p>
                {text === 0 ? '成功' : '失败'}
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
