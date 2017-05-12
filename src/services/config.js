/**
 * Created by yunge on 16/10/28.
 */

const api = '/api';

const requestPath = (entityType) => {
    const values = Object.keys(entityTypeConfig).map(key => entityTypeConfig[key].value);
    if (values.indexOf(entityType) === -1) {
        throw new Error(`unknown entityType: ${entityType}`);
    }
    return `${api}/${entityType}`;
};

//{entityType...}
const entityTypeConfig = {
    users: {
        name: '用户信息表',
        value: 'users',
        path: '/users',
        show: false,
    },
    banks: {
        name: '银行信息表',
        value: 'banks',
        path: '/banks',
        show: true,
    },
    bankCardTypes: {
        name: '银行卡类型信息表',
        value: 'bankCardTypes',
        path: '/bankCardTypes',
        show: true,
    },
    bankCardBins: {
        name: '银行卡bin信息表',
        value: 'bankCardBins',
        path: '/bankCardBins',
        show: true,
    },
    sources: {
        name: '调用方来源信息表',
        value: 'requestorSources',
        path: '/sources',
        show: true
    },
    channels: {
        name: '第三方渠道信息表',
        value: 'channels',
        path: '/channels',
        show: true,
    },
    requestors: {
        name: '调用方信息表',
        value: 'requestors',
        path: '/requestors',
        show: true,
    },
    orders: {
        name: '路由订单表',
        value: 'orders',
        path: '/orders',
        show: true,
    },
    authentifications: {
        name: '渠道鉴权表',
        value: 'authentifications',
        path: '/authentifications',
        show: true,
    },

    channelBankRels: {
        name: '第三方渠道银行关系表',
        value: 'channelBankRels',
        path: '/channelBankRels',
        show: false,
    },
    requestorChannelBankRels: {
        name: '第三方渠道银行关系表',
        value: 'requestorChannelBankRels',
        path: '/requestorChannelBankRels',
        show: false,
    },
    requestorChannelRels: {
        name: '调用方第三方关系表',
        value: 'requestorChannelRels',
        path: '/requestorChannelRels',
        show: false,
    },

};

export default {
    entityTypeConfig,
    requestPath
}
