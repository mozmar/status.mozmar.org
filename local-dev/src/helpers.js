export function formatYamlDateString(dateString) {
    // Separator should either be a dash or an underscore
    const separator = dateString.indexOf('-') > -1 ? '-' : '_';
    const pts = dateString.split(separator);

    return new Date(Date.UTC(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5], pts[6]));
}

export function buildServicesArray(jsonData) {
    const servicesArray = Object.keys(jsonData.components).map(key => {
        return jsonData.components[key];
    });

    return servicesArray;
}

export function buildNewGlobalStatusObject(jsonData, dateStamp = new Date()) {
    const newGlobalStatusObject = {
        status: jsonData.globalStatus.status,
        message: jsonData.globalStatus.message,
        services: buildServicesArray(jsonData),
        lastUpdate: dateStamp
    };

    return newGlobalStatusObject;
}

// Used in reduxStore.js to seed state and in tests
export const defaultGlobalData = {
    desktopNotify: false,
    isUpdating: false,
    lastUpdate: null,
    message: 'Fetching data...',
    notifyMessage: false,
    services: [],
    status: 'pending'
};

export const defaultServiceDetailData = {
    alerts: [],
    isUpdating: false,
    lastUpdate: null,
    message: 'Fetching data...'
};
