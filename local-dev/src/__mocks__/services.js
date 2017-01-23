const services = [
    {
        display: true,
        group: 'group1',
        hasDetail: false,
        id: 1,
        link: 'test link',
        name: 'test service 1',
        order: 1,
        status: 'healthy'
    },
    {
        display: true,
        hasDetail: true,
        id: 2,
        link: 'test link',
        name: 'test service 2',
        order: 2,
        status: 'healthy'
    },
    {
        display: true,
        group: 'group1',
        hasDetail: false,
        id: 3,
        link: 'test link',
        name: 'test service 3',
        order: 3,
        status: 'warning'
    },
    {
        display: true,
        group: 'group2',
        hasDetail: false,
        id: 4,
        link: 'test link',
        name: 'test service 4',
        order: 10,
        status: 'healthy'
    }
];

export default services;
