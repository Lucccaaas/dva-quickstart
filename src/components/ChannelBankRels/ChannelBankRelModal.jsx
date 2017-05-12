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
        title: type==='create' ? '添加关系信息' : '更改关系信息',
        visible,
        onOk: handleOk,
        onCancel,
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                    label="渠道："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('channelID', {
                        initialValue: item.channelID,
                        rules: [
                            {required: true, validator: notNull},
                        ],
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
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="银行渠道码："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('bankCode', {
                        initialValue: item.bankCode,
                        rules: [
                            {required: false, validator: notNull},
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="渠道名称："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('bankName', {
                        initialValue: item.bankName,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="number"/>
                    )}
                </FormItem>
                <FormItem
                    label="日限额："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('dayLimit', {
                        initialValue: item.dayLimit,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="number"/>
                    )}
                </FormItem>
                <FormItem
                    label="单笔限额："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('singleLimit', {
                        initialValue: item.singleLimit,
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