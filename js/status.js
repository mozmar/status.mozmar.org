var Component = React.createClass({
    badge: function() {
        var glyphicon = 'ok-sign';
        if (this.props.status == 'pending')
            glyphicon = 'question-sign';
        else if (this.props.status == 'warning')
            glyphicon = 'info-sign';
        else if (this.props.status == 'failed')
            glyphicon = 'remove-sign';

        return (
            <span className={"badge mybadge " + this.props.status}>
                <span className={"glyphicon glyphicon-" + glyphicon} aria-hidden="true">
                </span>
            </span>
        );
    },
    link: function() {
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
                <li className={"list-group-item"}>
                {this.badge()}
                {this.props.name}
                {this.link()}
                </li>
        );
    }
});

var GlobalStatus = React.createClass({
    color: function() {
        if (this.props.status.name == 'warning')
            return 'warning';
        else if (this.props.status.name == 'failed')
            return 'danger';
        else
            return 'success';
    },
    render: function() {
        return (
            <div className={"alert alert-" + this.color()} role="alert">
                {this.props.status.description}
            </div>
        );
    }
});


var ComponentList = React.createClass({
    render: function() {
        var componentNodes = [];
        for (var i=0; i < this.props.components.length; i++) {
            var component = this.props.components[i];
            if (component.display) {
                componentNodes.push(
                       <Component name={component.name} key={component.id} status={component.status} link={component.link}/>
                    );
            }
        }
        return (
                <ul className={"list-group"}>
                {componentNodes}
                </ul>
        );
    }
});

setInterval(function() {
    $.ajax({
        url: 'status.yml',
        cache: false,
        success: function(data) {
            var status_data = jsyaml.load(data);
            components = Object.keys(status_data.components).map(function (key) {return status_data.components[key]});
            ReactDOM.render(
                <GlobalStatus status={status_data.status}/>,
                document.getElementById('global-status')
            );
            ReactDOM.render(
                <ComponentList components={components}/>,
                document.getElementById('components')
            );
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
}, 1000);
