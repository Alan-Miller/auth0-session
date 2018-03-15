import React from 'react';
import axios from 'axios';
import beach from '../imgs/beach.jpg';
import coastalTown from '../imgs/coastal-town.jpg';
import forest from '../imgs/forest.jpg';
import mountains from '../imgs/mountains.jpg';
import skyline from '../imgs/skyline.jpg';
import snow from '../imgs/snow.jpg';

class Settings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image: ''
    }
  }

  componentDidMount() {
    console.log('mount!');
    axios.get('http://localhost:3402/api/image')
    .then(image => { 
      console.log('image response', image.data);
      this.setState({image: image.data}); 
    })
    .catch(err => { console.log('err', err); });
  }

  render() {
    console.log('image', this.state.image);
    const images = [beach, coastalTown, forest, mountains, skyline, snow];
    return (
      <div className="Settings">
        <div className="images">
          <h2>backgrounds</h2>
          {images.map((image, i) => (
            <div key={i} className="imageButton" style={{backgroundImage: `url(${image})`}}></div>
          ))}
        </div>
      </div>
    )
  }
}

export default Settings;

// "proxy": "http://localhost:3402",