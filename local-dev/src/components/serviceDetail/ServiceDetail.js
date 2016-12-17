/*
Displays details about service specified in URL.
*/

import React, { Component } from 'react';

import Header from '../Header';
import GlobalStatus from '../GlobalStatus';
import ServiceDetailHeader from './ServiceDetailHeader';
import ServiceDetailAlertList from './ServiceDetailAlertList';

class ServiceDetail extends Component {
    fetchInterval: undefined

    constructor() {
        super();
        this.getServiceObject = this.getServiceObject.bind(this);
    }

    componentDidMount() {
        // Invoke action to get global status on page load.
        this.props.fetchServiceDetail(this.props.params.serviceId);

        // Poll global status every 60 seconds.
        this.fetchInterval = setInterval(() => {
            this.props.fetchServiceDetail(this.props.params.serviceId);
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchInterval);
        this.props.resetServiceDetail();
    }

    // Pulls service detail from global services array.
    getServiceObject() {
        const service = this.props.global.services.filter(service => {
            return service.id === this.props.params.serviceId;
        });

        // Make sure the service was found.
        if (service.length > 0) {
            return service[0];
        }
    }

    render() {
        return (
            <div className="service-detail">
                <GlobalStatus
                    desktopNotify={this.props.global.desktopNotify}
                    message={this.props.global.message}
                    notifyMessage={this.props.global.notifyMessage}
                    status={this.props.global.status}
                    clearDesktopNotify={this.props.clearDesktopNotify}/>
                <Header />
                <ServiceDetailHeader service={this.getServiceObject()} />
                <ServiceDetailAlertList alerts={this.props.serviceDetail.alerts} />
            </div>
        );
    }
}

export default ServiceDetail;
