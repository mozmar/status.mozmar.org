import React from 'react';
import renderer from 'react-test-renderer';

import ServiceDetailGraph from '../../../components/serviceDetail/ServiceDetailGraph';

test('render ServiceDetailGraph', () => {
    const component = renderer.create(
        <ServiceDetailGraph url="http://www.mozilla.org/" />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
