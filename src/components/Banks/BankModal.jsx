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

const BankModal = ({
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
                    label="名称："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [
                            {required: true, validator: checkName},
                        ],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="说明："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('description', {
                        initialValue: item.description,
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="启用:"
                    {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: item.status || 0
                    })(
                        <RadioGroup>
                            <Radio key="否" value={0}>否</Radio>
                            <Radio key="是" value={1}>是</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    label="大图标:"
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('largeIconUrl', {
                        initialValue: item.largeIconUrl,
                        rules: [{required: false}]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="中等图标:"
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('mediumIconUrl', {
                        initialValue: item.mediumIconUrl,
                        rules: [{required: false}]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem
                    label="小图标:"
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('smallIconUrl', {
                        initialValue: item.smallIconUrl,
                        rules: [{required: false}]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

BankModal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object,
    item: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Form.create()(BankModal);