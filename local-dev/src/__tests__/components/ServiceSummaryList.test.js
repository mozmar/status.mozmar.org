import React from 'react';
import renderer from 'react-test-renderer';

import ServiceSummaryList from '../../components/ServiceSummaryList';

import services from '../../__mocks__/services';

test('render ServiceSummaryList', () => {
    const component = renderer.create(
        <ServiceSummaryList services={services} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
