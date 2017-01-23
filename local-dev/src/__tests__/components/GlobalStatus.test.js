import React from 'react';
import renderer from 'react-test-renderer';

import GlobalStatus from '../../components/GlobalStatus';

const mockClearDesktopNotify = jest.fn();

describe('render GlobalStatus', () => {
  test('renders a healthy GlobalStatus', () => {
      const component = renderer.create(
          <GlobalStatus status='healthy'
                        message='test'
                        notifyMessage={false}
                        desktopNotify={false}
                        clearDesktopNotify={mockClearDesktopNotify} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });

  test('renders a warning GlobalStatus', () => {
      const component = renderer.create(
          <GlobalStatus status='healthy'
                        message='test'
                        notifyMessage={false}
                        desktopNotify={false}
                        clearDesktopNotify={mockClearDesktopNotify} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });

  test('renders a failed GlobalStatus', () => {
      const component = renderer.create(
          <GlobalStatus status='healthy'
                        message='test'
                        notifyMessage={false}
                        desktopNotify={false}
                        clearDesktopNotify={mockClearDesktopNotify} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });

  test('renders a pending GlobalStatus', () => {
      const component = renderer.create(
          <GlobalStatus status='healthy'
                        message='test'
                        notifyMessage={false}
                        desktopNotify={false}
                        clearDesktopNotify={mockClearDesktopNotify} />
      );

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });
});

test('GlobalStatus sends a desktop notification', () => {
    // tests can't actually send a desktop notification
    GlobalStatus.prototype.sendDesktopNotification = jest.fn(() => true);
    // tests don't like looking for file paths, so we create a predictable stub
    GlobalStatus.prototype.statusToIcon = jest.fn(() => 'stub');

    const component = renderer.create(
        <GlobalStatus status='healthy'
                      message='playtime is fun'
                      notifyMessage={true}
                      desktopNotify={true}
                      clearDesktopNotify={mockClearDesktopNotify} />
    );

    expect(GlobalStatus.prototype.sendDesktopNotification).toHaveBeenCalledWith('playtime is fun', 'stub');
});
