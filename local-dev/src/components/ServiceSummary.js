import React, { Component } from 'react';
import { Link } from 'react-router';

class ServiceSummary extends Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired
    }

    render() {
        let name = (this.props.hasDetail) ? <Link to={`/service/${this.props.id}`}>{this.props.name}</Link> : this.props.name;

        return (
            <li className="list-group-item">
                <span className={"status " + this.props.status}>{this.props.status}</span>
                { name }
            </li>
        );
    }
}

export default ServiceSummary;
