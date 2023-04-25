import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';


export class App extends Component {
  state = {
    search: '',
    photos: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      fetch('https://pixabay.com/api/?q=cat&page=1&key=33211320-dec57621770c8fad3b041e20d&image_type=photo&orientation=horizontal&per_page=12').then(response => response.json())
        .then(obj => {
          this.setState({
            photos: obj.hits
          });
        });
    }
  }

  handleSubmit = (search) => {
    this.setState(search);
  }

  render() {

    return (

      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery aaa={this.state.photos} />
      </div>

    );
  }
};
