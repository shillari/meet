import { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = 'rgb(192, 192, 192)';
    this.bgColor = 'rgb(253, 253, 253)';
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 128, 255)';
    this.bgColor = 'rgb(240, 240, 255)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(204, 0, 0)';
    this.bgColor = 'rgb(255, 242, 242)';
  }
}

export { InfoAlert, ErrorAlert };