import React, {PropTypes} from 'react';
import {Table, Popconfirm, Pagination} from 'antd';

function ChannelList ({
    total, current, loading, dataSource,
    onPageChange,
    onDeleteItem,
    onEditItem,
}) {
    const columns = [{
        title: '银行ID',
        dataIndex: 'bankID',
        key: 'bankID',
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '渠道ID',
        dataIndex: 'channelID',
        key: 'channelID',
    }, {
        title: '调用方渠道ID',
        dataIndex: 'requestorID',
        key: 'requestorID',
    }, {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
    }, {
        title: '日限额',
        dataIndex: 'dayLimit',
        key: 'dayLimit',
    }, {
        title: '单笔限额',
        dataIndex: 'singleLimit',
        key: 'singleLimit',
    }, {
        title: '对应商户号',
        dataIndex: 'merchantID',
        key: 'merchantID',
    }, {
        title: '创建时间',
        dataIndex: 'insertTime',
        key: 'insertTime'
    }, {
        title: '支付类型',
        dataIndex: 'payType',
        key: 'payType'
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
