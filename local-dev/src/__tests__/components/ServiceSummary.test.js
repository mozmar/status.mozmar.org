import React from 'react';
import renderer from 'react-test-renderer';

import ServiceSummary from '../../components/ServiceSummary';

test('render ServiceSummary', () => {
    const component = renderer.create(
        <ServiceSummary status='healthy' name='police cops'/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
