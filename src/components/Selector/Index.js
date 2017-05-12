/**
 * Created by yunge on 16/11/8.
 */
import React from 'react';
import SearchSelect from './SearchSelect';


const SourceSearch = React.createClass({
    render() {
        return (
            <SearchSelect type="source" {...this.props}/>
        );
    },
});

const RequestorSearch = React.createClass({
    render() {
        return (
            <SearchSelect type="requestor" {...this.props}/>
        );
    },
});

const BankSearch = React.createClass({
    render() {
        return (
            <SearchSelect type="bank" {...this.props}/>
        );
    },
});


const ChannelSearch = React.createClass({
    render() {
        return (
            <SearchSelect type="channel" {...this.props}/>
        );
    },
});

const BankCardBinSearch = React.createClass({
    render() {
        return (
            <SearchSelect type="bankCardBin" {...this.props}/>
        );
    },
});

const BankCardTypeSearch = React.createClass({
    render() {
        return (
            <SearchSelect type="bankCardType" {...this.props}/>
        );
    },
});

export default {
    RequestorSearch,
    SourceSearch,
    ChannelSearch,
    BankCardBinSearch,
    BankCardTypeSearch,
    BankSearch,
};

