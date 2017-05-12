/**
 * Created by yunge on 16/11/8.
 */
import React from 'react';
import {Input, Select, Button, Icon} from 'antd';
import querystring from 'querystring';
import classNames from 'classnames';
import request from '../../utils/request';

const Option = Select.Option;

function searchFactory () {
    let timeout;
    let currentValue;
    return search;

    function search (type, value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const urls = {
            requestor: '/api/requestors',
            source: '/api/requestorSources',
            channel: '/api/channels',
            bank: '/api/banks',
            bankCardBin: '/api/bankCardBins',
            bankCardType: '/api/bankCardTypes'
        };

        function fake () {
            const str = querystring.encode({
                keywords: `name|${value}`,
            });
            const url = urls[type];
            request(`${url}?${str}`).then((resp) => {
                if (currentValue === value) {
                    const result = resp.data.data;
                    const data = [];
                    result.forEach((r) => {
                        data.push({
                            key: r.bizId,
                            label: r.name,
                        });
                    });
                    callback(data);
                }
            });
        }

        timeout = setTimeout(fake, 300);
    }
}
const SearchSelect = React.createClass({
    getInitialState() {
        return {
            data: [],
            value: '',
            focus: false
        };
    },
    handleChange(value) {
        console.log(value);
        console.log('输入框内容是: ', this.state.value);
        this.setState({value});
        this.props.search(this.props.type, value, data => this.setState({data}));
    },
    handleSubmit() {
        console.log('输入框内容是: ', this.state.value);
    },
    handleFocus(e) {
    },
    handleSelect(value){
        this.props.onChange(value);
    },
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    },
    componentWillMount() {
        this.props.search(this.props.type, "", data=> this.setState({data}));
    },
    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': this.state.value === {},
            // !!this.state.value.key.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        const options = this.state.data.map(option=>
            <Option key={option.key}>{option.label}</Option>);
        return (
            <div className="ant-search-input-wrapper" style={{width: '100%'}}>
                <Input.Group className={searchCls}>
                    &nbsp;
                    <Select
                        combobox
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        notFoundContent=""
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        onFocus={this.handleFocus}
                        onBlur={this.handleFocusBlur}
                    >
                        {options}
                    </Select>
                </Input.Group>
            </div>
        );
    },
});

const SearchSelectExported = (props) => {
    const search = searchFactory();
    props = {...props, search};
    return (<SearchSelect {...props}/>);
};

export default SearchSelectExported;
