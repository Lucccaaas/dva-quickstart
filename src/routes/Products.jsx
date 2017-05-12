/**
 * Created by yunge on 16/10/27.
 */

import React from 'react';
import {connect} from 'dva';
import ProductList from '../components/ProductList.jsx';

const Products = (props) => {
    function handleDelete (id) {
        props.dispatch({
            type: 'products/delete',
            payload: id,
        });
    }

    return (
        <div>
            <h2>List of Products</h2>
            <ProductList onDelete={handleDelete} products={props.products}/>
        </div>
    );
};

export default connect(({products}) => ({
    products
}))(Products);