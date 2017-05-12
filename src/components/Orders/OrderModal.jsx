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

    function notNull (rule, value, callback) {
        if (!value) {
            callback(new Error('不能为空'));
        }
        callback();
    }

    const modalOpts = {
        title: type === 'create' ? '添加路由信息' : '更改路由信息',
        visible,
        onOk: handleOk,
        onCancel,
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                    label="商户流水号："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('merchantNo', {
                        initialValue: item.merchantNo,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="调用方："
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
                    label="订单金额："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('amount', {
                        initialValue: item.amount,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="number"/>
                    )}
                </FormItem>
                <FormItem
                    label="渠道:"
                    {...formItemLayout}>
                    {getFieldDecorator('channelID', {
                        initialValue: item.channelID,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="number"/>
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