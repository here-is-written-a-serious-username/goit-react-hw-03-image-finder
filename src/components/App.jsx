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
    page: 1,
    photos: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {

      this.setState({
        page: 1,
      });
      getPhoto(this.state.search, this.state.page).then(obj => {
        this.setState({
          photos: obj.hits,
        });
      })
    }
    //&& this.state.page !== 1
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      console.log(this.state.page)
      getPhoto(this.state.search, this.state.page).then(obj => {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...obj.hits],
        }));
      })
    }

    if (prevState.photos !== this.state.photos) {
      lightbox.refresh();
    }
  }



  handleSubmit = (search) => {
    this.setState(search);
  }

  pageCount = () => {
    // page = this.state.page + 1;
    this.setState({
      page: this.state.page + 1
    });
    // console.log(this.state.page);
  }

  render() {

    return (

      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery photos={this.state.photos} />
        {this.state.photos.length && <Button nextPage={this.pageCount} />}
      </div>

    );
  }
};
