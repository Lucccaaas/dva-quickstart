import './index.html';
import './index.less';

/* 引入 antd 的样式文件*/
import 'antd/dist/antd.css'
import dva from 'dva';

// 1. Initialize
const app = dva({
    initialState: {
        products: [
            {name: 'dva', id: 1},
            {name: 'antd', id: 2},
        ],
    },
});

// 2. Plugins
//app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/products'));
app.model(require('./models/users'));
app.model(require('./models/banks'));
app.model(require('./models/bankCardBins'));
app.model(require('./models/channels'));
app.model(require('./models/requestors'));
app.model(require('./models/channelBankRels'));
app.model(require('./models/orders'));
app.model(require('./models/authentifications'));
app.model(require('./models/bankCardTypes'));
app.model(require('./models/requestorChannelBankRels'));
app.model(require('./models/requestorChannelRels'));
app.model(require('./models/sources'));
app.model(require('./models/withHoldings'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
