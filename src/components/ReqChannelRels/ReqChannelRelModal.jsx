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
        title: type==='create' ? '添加信息' : '更改信息',
        visible,
        onOk: handleOk,
        onCancel,
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                    label="调用方渠道ID："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('requestorID', {
                        initialValue: item.requestorID,
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="渠道ID："
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
                    label="对应商户号："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('merchantID', {
                        initialValue: item.merchantID,
                        rules: [
                            {required: true, validator: notNull},
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="是否必需鉴权:"
                    {...formItemLayout}>
                    {getFieldDecorator('isNeedSign', {
                        initialValue: item.isNeedSign || 0
                    })(
                        <RadioGroup>
                            <Radio key="否" value={0}>否</Radio>
                            <Radio key="是" value={1}>是</Radio>
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