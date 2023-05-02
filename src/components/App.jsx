import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import getPhoto from './getPhoto'


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Button from './Button';

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
      })
    }

    if (prevState.photos !== this.state.photos) {
      lightbox.refresh()
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
        <Button />
      </div>

    );
  }
};
