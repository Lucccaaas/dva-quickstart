import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage({children}) {
  return (
    <div className={styles.container}>
        {children}
    </div>
  );
}

IndexPage.propTypes = {
    children: PropTypes.element.isRequired,
};

export default connect()(IndexPage);
