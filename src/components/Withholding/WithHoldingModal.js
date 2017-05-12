import React, {PropTypes} from 'react';
import {Form, Input, Modal} from 'antd';
import MultiCheckBox from '../Selector/MultiCheckBox';
import  {RequestorSearch, SourceSearch} from '../Selector/Index';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const WithHoldingModal = ({
    visible,
    item = {},
    onOk,
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

    const modalOpts = {
        title: '配置代扣渠道',
        visible,
        onOk: handleOk,
        onCancel,
    };

    const onRequestorChange = (data) => {
        console.log(data);
        item.requestorId = data;
    };
    const onSourceChange = (data) => {
        console.log(data);
        item.sourceId = data;
    };
    const onChannelChange = (data) => {
        console.log(data);
        item.channelIds = data;
    };

    const notNull = (rule, value, callback) => {
        if (value && value.length > 0) {
            callback();
        } else {
            throw new Error('渠道不能为空~');
        }
    };

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                    label="调用方："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('requestorId', {
                        initialValue: item.requestorId,
                        rules: [
                            {required: true, message: '名称未填写'},
                        ],
                    })(
                        <RequestorSearch onChange={onRequestorChange}/>
                    )}
                </FormItem>
                <FormItem
                    label="调用方来源："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('sourceId', {
                        initialValue: item.sourceId,
                        rules: [
                            {required: true, validator: checkNumber},
                        ],
                    })(
                        <SourceSearch onChange={onSourceChange}/>
                    )}
                </FormItem>
                <FormItem
                    label="必需的鉴权渠道："
                    hasFeedback
                    {...formItemLayout}>
                    {getFieldDecorator('channelIds', {
                        initialValue: item.channelIds,
                        rules: [
                            {required: true, validator: notNull},
                        ],
                    })(
                        <MultiCheckBox onChange={onChannelChange}/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

WithHoldingModal.propTypes = {
    visible: PropTypes.any,
    form: PropTypes.object,
    item: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Form.create()(WithHoldingModal);