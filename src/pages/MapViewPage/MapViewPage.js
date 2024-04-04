import React from 'react';
import MapComponent from "./MapComponent";
class MapViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome to my basic React page!'
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <p>This is a very basic React page.</p>
        <MapComponent/>
      </div>
    );
  }
}

export default MapViewPage;
