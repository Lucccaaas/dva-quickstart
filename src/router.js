import React, {PropTypes} from 'react';
import {Router, Route, IndexRedirect, Redirect, Link} from 'dva/router';
import IndexPage from './routes/IndexPage.jsx';
import IntraIndex from './routes/IntraIndex.jsx';
import Users from './routes/users/Users.jsx';
import Banks from './routes/banks/Banks.jsx';
import BankCardBins from './routes/bankCardBins/BankCardBins';
import Channels from './routes/channels/Channels';
import Requestors from './routes/requestors/Requestors';
import ChannelBankRels from './routes/channelBankRels/ChannelBankRels';
import Orders from './routes/orders/Orders';
import Authentifications from './routes/authentifications/Authentifications';
import BankCardTypes from './routes/bankCardTypes/BankCardTypes';
import ReqChannelBankRels from './routes/requestorChannelBankRels/ReqChannelBankRels';
import ReqChannelRels from './routes/requestorChannelRels/ReqChannelRels';
import Sources from './routes/sources/Sources';
import Withholding from './routes/withholding/Withholding';

export default function ({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={IndexPage}>
                <Route components={IntraIndex}>
                    <IndexRedirect to="/banks"/>
                    <Route path="/users" component={Users}/>
                    <Route path="/banks" component={Banks}/>
                    <Route path="/bankCardBins" component={BankCardBins}/>
                    <Route path="/channels" component={Channels}/>
                    <Route path="/requestors" component={Requestors}/>
                    <Route path="/channelBankRels" component={ChannelBankRels}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/authentifications" component={Authentifications}/>
                    <Route path="/bankCardTypes" component={BankCardTypes}/>
                    <Route path="/requestorChannelBankRels" component={ReqChannelBankRels}/>
                    <Route path="/requestorChannelRels" component={ReqChannelRels}/>
                    <Route path="/sources" component={Sources}/>
                    <Route path="/withholding" component={Withholding}/>
                    <Redirect path="*" to="/banks" />
                </Route>
            </Route>
        </Router>
    );
};
