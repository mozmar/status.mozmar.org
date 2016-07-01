var Component = React.createClass({
    render: function() {
        console.log(this.props.status);
        var color = 'green';
        if (this.props.status == 'pending')
            color = 'gray';
        else if (this.props.status == 'warning')
            color = 'orange';
        else if (this.props.status == 'failed')
            color = 'red';

        return (
                <li style={{ color: color }}>
                {this.props.name}
                </li>
        );
    }
});


var ComponentList = React.createClass({
    loadFromServer: function() {
        $.ajax({
            url: 'status.yml',
            cache: false,
            success: function(data) {
                components = jsyaml.load(data);
                components = Object.keys(components).map(function (key) {return components[key]});
                this.setState({data: components});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadFromServer();
        setInterval(this.loadFromServer, 60000);
    },
    render: function() {
        var componentNodes = this.state.data.map(function(component) {
            return (
                    <Component name={component.name} key={component.id} status={component.status}/>
            );
        });
        return (
                <ul>
                {componentNodes}
                </ul>
        )
    }
});

ReactDOM.render(
        <ComponentList />,
    document.getElementById('components')
);
