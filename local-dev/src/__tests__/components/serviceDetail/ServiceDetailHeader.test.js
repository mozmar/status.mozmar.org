import React from 'react';
import renderer from 'react-test-renderer';

import ServiceDetailHeader from '../../../components/serviceDetail/ServiceDetailHeader';

describe('render ServiceDetailHeader', () => {
    test('render ServiceDetailHeader with no service object', () => {
        const component = renderer.create(
            <ServiceDetailHeader service={undefined} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('render ServiceDetailHeader with a service object', () => {
        const service = {
            group: 'test group',
            name: 'test service',
            status: 'test status',
            type: 'test type'
        };

        const component = renderer.create(
            <ServiceDetailHeader service={service} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
