import React, { Component } from 'react';

class ServiceDetailGraph extends Component {
    static propTypes = {
        url: React.PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="service-detail-alert-graph-wrapper">
                <iframe className="service-detail-alert-graph" src={this.props.url} />
            </div>
        );
    }
}

export default ServiceDetailGraph;
