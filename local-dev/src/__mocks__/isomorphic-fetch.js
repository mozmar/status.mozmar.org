import newGlobalStatusData from './newGlobalStatusData';
import newServiceDetailData from './newServiceDetailData';

export default function fetch(url, options) {
    return new Promise((resolve, reject) => {
        // global status polling
        if (url.indexOf('status.yml') > -1) {
            resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                text: function () {
                    return new Promise((resolve, reject) => {
                        // we're mocking jsyaml in actionCreators.test.js,
                        // so we can just pass back JSON here
                        resolve(JSON.stringify(newGlobalStatusData));
                    });
                }
            });
        // service detail polling
        } else if (url.indexOf('service-detail/') > -1) {
            resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                text: function () {
                    return new Promise((resolve, reject) => {
                        // we're mocking jsyaml in actionCreators.test.js,
                        // so we can just pass back JSON here
                        resolve(JSON.stringify(newServiceDetailData));
                    });
                }
            });
        } else {
            // generic handler - not used at the moment
            resolve({
                ok: true,
                status: 200,
                statusText: 'OK'
            });
        }
    });
}
