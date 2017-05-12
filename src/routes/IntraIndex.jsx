/**
 * Created by yunge on 16/10/28.
 */

import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../components/MainLayout/MainLayout";

function IntraIndex ({children, location}) {
    return (
        <MainLayout location={location}>
            {children}
        </MainLayout>
    );
}

IntraIndex.propTypes = {
    children: PropTypes.element.isRequired
};

export default connect()(IntraIndex);
