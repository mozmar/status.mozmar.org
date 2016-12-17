// What our YAML looks like after being JSON-ified
const newServiceDetailData = {
    '2016_12_17_11_53_12_34': {
        description: 'First test alert',
        graph: 'https://www.mozilla.org/',
        link: 'https://twitter.com/search?q=%23mozaloha&src=typd',
        resolved: false,
        severity: '1',
        time: '2016_12_17_12_30_12_34'
    },
    '2016_12_14_16_53_12_34': {
        description: 'Second test alert',
        graph: 'https://www.mozilla.org/',
        link: 'https://twitter.com/search?q=%23mozaloha&src=typd',
        resolved: true,
        severity: '1',
        time: '2016_12_14_12_30_12_34'
    },
    lastUpdate: '2016_12_17_20_01_11_22',
    message: 'Service data updated.'
}

export default newServiceDetailData;
