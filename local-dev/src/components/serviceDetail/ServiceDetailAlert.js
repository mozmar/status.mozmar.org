import React, { Component } from 'react';

import ServiceDetailGraph from './ServiceDetailGraph';

import { formatYamlDateString } from '../../helpers';

class ServiceDetailAlert extends Component {
    static propTypes = {
        alertData: React.PropTypes.object.isRequired
    }

    renderResolved(resolved) {
        // These map to Bootstrap label class names.
        const labelClass = resolved ? 'success' : 'danger';

        const label = resolved ? 'yes' : 'no';

        return (
            <span className={'label label-' + labelClass}>{label}</span>
        );
    }

    renderSeverity(severity) {
        let labelClass;
        let label;

        // These also map to Bootstrap label class names.
        switch (severity) {
            case 'h':
                labelClass = 'warning';
                label = 'high';
                break;
            case 'm':
                labelClass = 'info';
                label = 'medium';
                break;
            default:
                labelClass = 'default';
                label = 'low';
                break;
        }

        return (
            <span className={'label label-' + labelClass}>{label}</span>
        );
    }

    render() {
        const data = this.props.alertData; // because convenience

        return (
            <div className="service-detail-alert">
                <h4><a href={data.link} rel="external">{data.description}</a></h4>
                <div className="service-detail-alert-data-wrapper">
                    <dl className="service-detail-alert-data-list">
                        <dt>Resolved</dt>
                        <dd>{this.renderResolved(data.resolved)}</dd>
                        <dt>Severity</dt>
                        <dd>{this.renderSeverity(data.severity)}</dd>
                        <dt>Occurred</dt>
                        <dd>{formatYamlDateString(data.alertOccurred).toString()}</dd>
                        <dt>Logged</dt>
                        <dd>{formatYamlDateString(data.alertLogged).toString()}</dd>
                    </dl>
                    <ServiceDetailGraph url={data.graph} />
                </div>
            </div>
        );
    }
}

export default ServiceDetailAlert;
