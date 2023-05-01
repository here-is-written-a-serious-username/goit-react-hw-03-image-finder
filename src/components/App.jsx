import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import getPhoto from './getPhoto'


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a');


export class App extends Component {
  state = {
    search: '',
    photos: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      getPhoto(this.state.search).then(obj => {
        this.setState({
          photos: obj.hits
        });
        lightbox.refresh();
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
        <ImageGallery photos={this.state.photos} />
      </div>

    );
  }
};
