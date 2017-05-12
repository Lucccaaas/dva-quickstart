/**
 * Created by yunge on 16/11/8.
 */
import React from 'react';
import {Checkbox} from 'antd';
import request from '../../utils/request';

const CheckboxGroup = Checkbox.Group;

const MultiCheckBox = React.createClass({
    getInitialState() {
        return {
            value: '',
            focus: false,
            data: [],
        };
    },
    componentWillMount() {
          request('/api/channels')
              .then(resp => resp.data)
              .then(resp => {
                  const data = resp.data.map(item => ({
                      value: item.id,
                      label: item.name,
                  }));
                  this.setState({data});
              });
    },
    render() {
        return (<div>
            <CheckboxGroup options={this.state.data} defaultValue={[]} onChange={this.props.onChange}/>
        </div>);
    }
});

export default MultiCheckBox;
