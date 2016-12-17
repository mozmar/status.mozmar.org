import React from 'react';
import renderer from 'react-test-renderer';

import ServiceSummaryGroup from '../../components/ServiceSummaryGroup';

import services from '../../__mocks__/services';

describe('render ServiceSummaryGroup', () => {
    test('render basic ServiceSummaryGroup', () => {
        const component = renderer.create(
            <ServiceSummaryGroup name='Test Group' order={1} services={services} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Test when name='default' (as header will not render)
    test('render default ServiceSummaryGroup', () => {
        const component = renderer.create(
            <ServiceSummaryGroup name='default' order={2} services={services} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
