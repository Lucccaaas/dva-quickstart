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

const SourceModal = ({
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
                    label="来源名称："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

SourceModal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object,
    item: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Form.create()(SourceModal);