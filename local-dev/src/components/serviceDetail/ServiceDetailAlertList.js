import React, { Component } from 'react';

import ServiceDetailAlert from './ServiceDetailAlert';

class ServiceDetailAlertList extends Component {
    static propTypes = {
        alerts: React.PropTypes.array.isRequired
    }

    // Bind 'this' for class functions - otherwise 'this' is undefined
    constructor() {
        super();
        this.renderServiceDetailAlert = this.renderServiceDetailAlert.bind(this);
    }

    renderServiceDetailAlert(index) {
        return (
            <li key={index} className="list-group-item">
                <ServiceDetailAlert alertData={this.props.alerts[index]} />
            </li>
        );
    }

    render() {
        if (this.props.alerts.length > 0) {
            return (
                <div className="service-detail-alerts">
                    <ul className="service-detail-alert-list list-group">
                        {Object.keys(this.props.alerts).map(this.renderServiceDetailAlert)}
                    </ul>
                </div>
            );
        } else {
            // Empty div while data is fetched.
            return (
                <div></div>
            );
        }
    }
}

export default ServiceDetailAlertList;
