import React, {PropTypes} from 'react';
import {Form, Input, Modal} from 'antd';
import {BankSearch, BankCardTypeSearch} from '../Selector/Index';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const BankBinModal = ({
    visible,
    item = {},
    onOk,
    type,
    onCancel,
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

    function notNull (rule, value, callback) {
        if (!value) {
            callback(new Error('不能为空'));
        }
        callback();
    }

    function getValueOrElse (object, key, elseValue) {
        return (object || {})[key] || elseValue;
    }

    const modalOpts = {
        title: type === 'create' ? '添加银行卡信息' : '更改信息',
        visible,
        onOk: handleOk,
        onCancel,
    };
    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                    label="银行："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('bank.bizId', {
                        initialValue: getValueOrElse(item.bank, 'bizId', ""),
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <BankSearch/>
                    )}
                </FormItem>
                <FormItem
                    label="银行卡类型："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('bankCardType.bizId', {
                        initialValue: getValueOrElse(item.bankCardType, 'bizId', ''),
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <BankCardTypeSearch/>
                    )}
                </FormItem>
                <FormItem
                    label="银行卡长度："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('cardLength', {
                        initialValue: item.cardLength,
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <Input type="number"/>
                    )}
                </FormItem>

            </Form>
        </Modal>
    );
};

BankBinModal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object,
    item: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Form.create()(BankBinModal);