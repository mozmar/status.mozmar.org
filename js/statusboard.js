var GlobalStatus = React.createClass({
    render: function() {
        var className = "alert alert-" + this.props.color;
        return (
            <div className={className} role="alert">
              {this.props.message}
            </div>
        );
    }

});

var Component = React.createClass({
    getBadge: function() {
        var status = this.props.status;
        var glyphicon;
        switch(status) {
        case 'pending':
            glyphicon = 'question-sign';
            break;
        case 'warning':
            glyphicon = 'info-sign';
            break;
        case 'failed':
            glyphicon = 'remove-sign';
            break;
        default:
            glyphicon = 'ok-sign';
        }

        return (
            <span className={"badge mybadge " + this.props.status}>
              <span className={"glyphicon glyphicon-" + glyphicon} aria-hidden="true">
              </span>
            </span>
        );
    },
    getLink: function() {
        if (this.props.link === '')
            return '';

        return (
            <a href={this.props.link}>
              <span className="glyphicon glyphicon-link" aria-hidden="true">
              </span>
            </a>
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
                   name={component.name} />
            );
        });
        return components;
    },
    render: function() {
        var components = this.getComponents();
        return (
            <ul className={"list-group"}>
              <li className="list-group-item list-group-item-info">
                {this.props.name}
              </li>
              {components}
            </ul>
        );
    }
})

var ComponentList = React.createClass({
    generateGroups: function() {
        var groups = {
            'Generic Alerts': []
        };
        this.props.components.forEach(function(component) {
            if (!component.display)
                return;

            if (component.group) {
                if (Object.keys(groups).indexOf(component.group) >= 0) {
                    groups[component.group].push(component);
                }
                else {
                    groups[component.group] = [component];
                }
            }
            else {
                groups['Generic Alerts'].push(component);
            }

        });
        return groups;
    },
    render: function() {
        var groups = this.generateGroups();
        var componentGroups = [];
        for (var property in groups) {
            if (groups.hasOwnProperty(property)) {
                componentGroups.push(
                    <ComponentGroup key={property} name={property} components={groups[property]} />
                );
            }
        }
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
        favicon.href = "http://localhost:8000/img/favicon-" + this.props.status + ".ico";
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
            components: []
        };
    },
    transformStatusToBootstrap: function(status) {
        switch(status) {
        case 'healthy':
            return 'success';
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
                    components: components
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
                 color={this.transformStatusToBootstrap(this.state.globalStatus)}/>
              <h1>Mozilla Marketing Status Board</h1>
              <ComponentList components={this.state.components} />
              <Favicon status={this.state.globalStatus} />
            </div>
        );
    }
});


ReactDOM.render(
    <StatusBoard />,
    document.getElementById("root")
);
