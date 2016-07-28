const DEFAULT_ORDER_VALUE = 10000;

var GlobalStatus = React.createClass({
    statusToColor: function(status) {
        switch(status) {
        case 'healthy':
            return 'success';
            break;
        case 'warning':
            return 'warning';
            break;
        case 'failed':
            return 'danger';
            break;
        case 'pending':
            return 'info';
            break;
        default:
            return '';
            break;
        }
    },
    render: function() {
        var className = "alert alert-" + this.statusToColor(this.props.status);
        return (
            <div className={className} role="alert">
              {this.props.message}
            </div>
        );
    }

});

var Component = React.createClass({
    getBadge: function() {
        return (
            <span className={"status " + this.props.status}>{this.props.status}</span>
        );
    },
    getLink: function() {
        if (this.props.link === '')
            return '';

        return (
            <a className="status-link" href={this.props.link} title="Learn more">Learn more</a>
        );
    },
    render: function() {
        return (
            <li className="list-group-item">
              {this.getBadge()}
              {this.props.name}
              &nbsp;
              {this.getLink()}
            </li>
        );
    }
})

var ComponentGroup = React.createClass({
    getComponents: function() {
        var components = [];
        this.props.components.forEach(function(component){
            if (!component.display)
                return;

            components.push(
                <Component
                   key={component.id}
                   status={component.status}
                   link={component.link}
                   name={component.name}
                   order={component.order}/>
            );
        });
        components.sort(function(a, b) {
            // Reverse ordering
            var a_order = a.props.order !== undefined ? a.props.order : 0;
            var b_order = b.props.order !== undefined ? b.props.order : 0;
            if (a_order < b_order)
                return -1;
            else if (a_order > b_order)
                return 1;
            return 0;
        });

        return components;
    },
    render: function() {
        var components = this.getComponents();
        var header = null;
        if (this.props.name != 'default') {
            header = (
                <li className="list-group-item list-group-item-info">
                    {this.props.name}
                </li>
            );
        }
        return (
            <ul className={"list-group"}>
                {header}
                {components}
            </ul>
        );
    }
})

var ComponentList = React.createClass({
    generateGroups: function() {
        var groups = {
            default: {
                order: DEFAULT_ORDER_VALUE + 1,
                components: []

            }
        };
        this.props.components.forEach(function(component) {
            if (!component.display)
                return;

            if (component.group) {
                if (Object.keys(groups).indexOf(component.group) >= 0) {
                    groups[component.group].components.push(component);
                }
                else {
                    groups[component.group] = {
                        components: [component]
                    };
                }
            }
            else {
                groups.default.components.push(component);
            }
        });

        for (var property in groups) {
            if (groups.hasOwnProperty(property)) {
                if (property === 'default')
                    // Default group has already calculated order.
                    continue;
                groups[property].order = this.getGroupOrder(groups[property].components);
            }
        };

        return groups;
    },
    /**
     *  Group order is defined by the component in the group with the minimum
     *  order value.
     *
     * Default is DEFAULT_ORDER_VALUE.
     */
    getGroupOrder: function(components) {

        var order = DEFAULT_ORDER_VALUE;
        components.forEach(function(component) {
            if (component.order && component.order < order) {
                order = component.order;
            }
        });
        return order;
    },
    render: function() {
        var groups = this.generateGroups();
        var componentGroups = [];
        for (var property in groups) {
            if (groups.hasOwnProperty(property)) {
                componentGroups.push(
                    <ComponentGroup key={property}
                                    name={property}
                                    components={groups[property].components}
                                    order={groups[property].order} />
                );
            }
        }

        componentGroups.sort(function(a, b) {
            // Reverse ordering
            var a_order = a.props.order;
            var b_order = b.props.order;
            if (a_order < b_order)
                return -1;
            else if (a_order > b_order)
                return 1;
            return 0;
        });

        return (
            <div>
              {componentGroups}
            </div>
        );
    }
});

var Favicon = React.createClass({
    componentDidUpdate() {
        var favicon = document.getElementById('favicon');
        favicon.href = "/img/favicon-" + this.props.status + ".ico";
    },
    render: function() {
        return null;
    }
});

var LastUpdate = React.createClass({
    componentDidUpdate() {
        var lastUpdate = document.getElementById('last-update');
        lastUpdate.textContent = "Last Update: "+ this.props.lastUpdate;
    },
    render: function() {
        return null;
    }
});


var StatusBoard = React.createClass({
    getInitialState: function() {
        return {
            globalStatusMessage: 'Fetching data.',
            globalStatus: 'pending',
            components: [],
            lastUpdate: null
        };
    },
    updateStatus: function() {
        $.ajax({
            url: 'status.yml',
            cache: false,
            success: function(data) {
                var statusData = jsyaml.load(data);
                var components = Object.keys(statusData.components).map(
                    function (key) {
                        return statusData.components[key];
                    });
                this.setState({
                    globalStatus: statusData.globalStatus.status,
                    globalStatusMessage: statusData.globalStatus.message,
                    components: components,
                    lastUpdate: new Date()
                });
            }.bind(this),
            error: function(data) {
                this.setState({
                    globalStatus: 'failed',
                    globalStatusMessage: 'Failed to update status',
                    components: []
                });
            }.bind(this)
        });

    },
    componentDidMount: function() {
        this.updateStatus();
        setInterval(this.updateStatus, 60000);
    },
    render: function() {
        return (
            <div>
              <GlobalStatus
                 message={this.state.globalStatusMessage}
                 status={this.state.globalStatus}/>
              <h1>
                <a href="http://status.mozmar.org">
                  <img src="/img/logo.png" alt="Mozilla Engagement Engineering Status Board" />
                </a>
              </h1>
              <ComponentList components={this.state.components} />
              <Favicon status={this.state.globalStatus} />
              <LastUpdate lastUpdate={this.state.lastUpdate}/>

            </div>
        );
    }
});


ReactDOM.render(
    <StatusBoard />,
    document.getElementById("root")
);
