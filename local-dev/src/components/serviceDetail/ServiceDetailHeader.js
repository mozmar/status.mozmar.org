import React, { Component } from 'react';

class ServiceDetailHeader extends Component {
    static propTypes = {
        service: React.PropTypes.object
    }

    render() {
        if (this.props.service) {
            const service = this.props.service;

            return (
                <div className="service-detail-header">
                    <h2>{service.name}</h2>
                    <h3>{service.group} | {service.type} | {service.status}</h3>
                </div>
            );
        } else {
            // Empty div while we wait for async data fetch.
            return (<div></div>);
        }
    }
}

export default ServiceDetailHeader;
