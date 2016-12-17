import React from 'react';
import renderer from 'react-test-renderer';

import ServiceDetailAlertList from '../../../components/serviceDetail/ServiceDetailAlertList';

import alerts from '../../../__mocks__/alerts';

describe('test ServiceDetailAlertList renders', () => {
    test('render ServiceDetailAlertList with no alerts', () => {
        const component = renderer.create(
            <ServiceDetailAlertList alerts={[]} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('render ServiceDetailAlertList with alerts', () => {
        const component = renderer.create(
            <ServiceDetailAlertList alerts={alerts} />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
