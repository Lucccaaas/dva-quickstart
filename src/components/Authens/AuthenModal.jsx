import React, {PropTypes} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const ChannelModal = ({
    visible,
    item = {},
    onOk,
    onCancel,
    type,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
}) => {
    function handleOk () {
        validateFields((errors) => {
            if (errors) {
                return;
            }
            const data = {...getFieldsValue(), key: item.key};
            onOk(data);
        });
    }

    function checkName (rule, value, callback) {
        if (!value) {
            callback(new Error('名称未填写'));
        }

        if (value.length >= 64) {
            callback(new Error('名称过长'));
        }
        callback();
    }

    function checkNumber (rule, value, callback) {
        if (!value) {
            callback(new Error('年龄未填写'));
        }
        if (!/^[\d]{1,2}$/.test(value)) {
            callback(new Error('年龄不合法'));
        } else {
            callback();
        }
    }

    function notNull(rule, value ,callback) {
        if (!value) {
            callback(new Error('不能为空'));
        }
        callback();
    }

    const modalOpts = {
        title: type==='create' ? '添加银行信息' : '更改银行信息',
        visible,
        onOk: handleOk,
        onCancel,
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                    label="编号："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('authentificationID', {
                        initialValue: item.authentificationID,
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="渠道编号："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('channelID', {
                        initialValue: item.channelID,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="调用方渠道ID："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('requestorID', {
                        initialValue: item.requestorID,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="调用方唯一订单编号："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('requestorOrderID', {
                        initialValue: item.requestorOrderID,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="银行："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('bankID', {
                        initialValue: item.bankID,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="number"/>
                    )}
                </FormItem>
                <FormItem
                    label="银行卡号："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('cardNum', {
                        initialValue: item.cardNum,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="number"/>
                    )}
                </FormItem>
                <FormItem
                    label="鉴权结果:"
                    {...formItemLayout}>
                    {getFieldDecorator('sign', {
                        initialValue: item.sign === 0 ? 0  : 1
                    })(
                        <RadioGroup>
                            <Radio key="否" value={0}>成功</Radio>
                            <Radio key="是" value={1}>失败</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

ChannelModal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object,
    item: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Form.create()(ChannelModal);