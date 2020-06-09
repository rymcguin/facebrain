import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Nav/Navigation.js';
import FaceRecongnition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImgLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '30dcee6bcf094d3880c92ba0a9a4ba46'
})

const particlesOptions = {
  particles: {
    number: {
      value: 250
    },
    size: {
      value: 3
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgURL: '',
      box: {},
      route: 'signin',
      signedIn : false
    }
  }
  calcFace = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({ box: box });

  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imgURL: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calcFace(response)))
      .catch(err => console.log(err));

  }
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({signedIn: false})
    }else if(route === 'home') {
      this.setState({signedIn: true})
    }
    this.setState({ route: route })
  }
  render() {
    const {route, signedIn, box, imgURL} = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation signedIn={signedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />

            <FaceRecongnition box={box} imgURL={imgURL} />
          </div>

          : (route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />

          )

        }



      </div>
    );
  }

}

export default App;
