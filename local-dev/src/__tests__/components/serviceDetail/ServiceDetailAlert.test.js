import React from 'react';
import renderer from 'react-test-renderer';

import ServiceDetailAlert from '../../../components/serviceDetail/ServiceDetailAlert';

import alerts from '../../../__mocks__/alerts';

test('render ServiceDetailAlert', () => {
    const component = renderer.create(
        <ServiceDetailAlert alertData={alerts[0]} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
