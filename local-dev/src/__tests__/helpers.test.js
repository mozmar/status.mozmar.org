import * as helpers from '../helpers';
import newGlobalStatusData from '../__mocks__/newGlobalStatusData';

const expectedServices = [
    newGlobalStatusData.components['service1'],
    newGlobalStatusData.components['service2']
];

test('formatYamlDateString', () => {
    expect(helpers.formatYamlDateString('2016_12_05_17_23_45_42')).toEqual(new Date(Date.UTC(2016, 12, 5, 17, 23, 45, 42)));
    expect(helpers.formatYamlDateString('2016-12-05-17-23-45-42')).toEqual(new Date(Date.UTC(2016, 12, 5, 17, 23, 45, 42)));
});

test('buildServicesArray', () => {
    const services = helpers.buildServicesArray(newGlobalStatusData);

    expect(services).toEqual(expectedServices);
});

test('buildNewGlobalStatusObject', () => {
    const newGlobalStatusObject = helpers.buildNewGlobalStatusObject(newGlobalStatusData, 'current timestamp');

    expect(newGlobalStatusObject).toEqual({
        status: newGlobalStatusData.globalStatus.status,
        message: newGlobalStatusData.globalStatus.message,
        services: expectedServices,
        lastUpdate: 'current timestamp'
    });
});
