// 财务管理 - 目录配置
const FINANCE_DIR = {
    title: '财务管理',
    key: 'finance',
    path: '/home/finance',
    icon: 'pay-circle',
    childRoute: [
        {
            title: '财务设置',
            key: 'config',
            path: '/home/finance/config',
            ancestor: ['finance'],
            childRoute: [
                {
                    title: '收费设置',
                    key: 'toll',
                    path: '/home/finance/config/toll',
                    ancestor: ['finance', 'config'],
                    component: require('./containers/config/Toll').default
                }, {
                    title: '开票信息',
                    key: 'billing',
                    path: '/home/finance/config/billing',
                    ancestor: ['finance', 'config'],
                    component: require('./containers/config/Billing').default
                }
            ]
        }, {
            title: '租金审核',
            key: 'rentReview',
            path: '/home/finance/rentReview',
            ancestor: ['finance'],
            component: require('./containers/RentReview').default
        }, {
            title: '物业费审核',
            key: 'propertyCostsReview',
            path: '/home/finance/propertyCostsReview',
            ancestor: ['finance'],
            component: require('./containers/PropertyCostsReview').default
        }, {
            title: '电费审核',
            key: 'electricity',
            path: '/home/finance/electricity',
            ancestor: ['finance'],
            component: require('./containers/Electricity').default
        }, {
            title: '水费审核',
            key: 'waterFee',
            path: '/home/finance/waterFee',
            ancestor: ['finance'],
            component: require('./containers/WaterFee').default
        }, {
            title: '租赁保证金审核',
            key: 'leaseMargin',
            path: '/home/finance/leaseMargin',
            ancestor: ['finance'],
            component: require('./containers/LeaseMargin').default
        }, {
            title: '欢乐颂押金审核',
            key: 'happyDeposit',
            path: '/home/finance/happyDeposit',
            ancestor: ['finance'],
            component: require('./containers/HappyDeposit').default
        }, {
            title: '能源管理押金审核',
            key: 'energyDeposit',
            path: '/home/finance/energyDeposit',
            ancestor: ['finance'],
            component: require('./containers/EnergyDeposit').default
        }, {
            title: '二次装修审核',
            key: 'secondReview',
            path: '/home/finance/secondReview',
            ancestor: ['finance'],
            component: require('./containers/SecondReview').default
        }
    ]
}

export default FINANCE_DIR
