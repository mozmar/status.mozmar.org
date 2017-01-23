import React, { Component } from 'react';

import ServiceSummaryGroup from './ServiceSummaryGroup';


class ServiceSummaryList extends Component {
    static propTypes = {
        services: React.PropTypes.array.isRequired
    }

    DEFAULT_ORDER_VALUE = 10000;

    constructor() {
        super();

        this.generateGroups = this.generateGroups.bind(this);
        this.getGroupOrder = this.getGroupOrder.bind(this);
    }

    generateGroups() {
        var groups = {
            default: {
                order: this.DEFAULT_ORDER_VALUE + 1,
                services: []
            }
        };

        this.props.services.forEach(service => {
            if (!service.display) {
                return;
            }

            if (service.group) {
                if (Object.keys(groups).indexOf(service.group) >= 0) {
                    groups[service.group].services.push(service);
                } else {
                    groups[service.group] = {
                        services: [service]
                    };
                }
            } else {
                groups.default.services.push(service);
            }
        });

        for (var property in groups) {
            if (groups.hasOwnProperty(property)) {
                if (property === 'default') {
                    // Default group has already calculated order.
                    continue;
                }

                groups[property].order = this.getGroupOrder(groups[property].services);
            }
        };

        return groups;
    }

    /**
     * Group order is defined by the component in the group with the minimum
     * order value.
     *
     * Default is DEFAULT_ORDER_VALUE.
     */
    getGroupOrder(services) {
        var order = this.DEFAULT_ORDER_VALUE;

        services.forEach(service => {
            if (service.order && service.order < order) {
                order = service.order;
            }
        });

        return order;
    }

    render() {
        var groups = this.generateGroups();
        var serviceGroups = [];

        for (var property in groups) {
            if (groups.hasOwnProperty(property)) {
                serviceGroups.push(
                    <ServiceSummaryGroup
                        key={property}
                        name={property}
                        services={groups[property].services}
                        order={groups[property].order} />
                );
            }
        }

        serviceGroups.sort((a, b) => {
            // Reverse ordering
            var a_order = a.props.order;
            var b_order = b.props.order;

            if (a_order < b_order) {
                return -1;
            } else if (a_order > b_order) {
                return 1;
            }

            return 0;
        });

        return (
            <div className="service-groups">
                {serviceGroups}
            </div>
        );
    }
}

export default ServiceSummaryList;
