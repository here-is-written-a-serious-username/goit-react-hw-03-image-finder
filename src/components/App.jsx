import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import getPhoto from './getPhoto'
import Button from './Button';

import { BallTriangle } from 'react-loader-spinner'

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let lightbox = new SimpleLightbox('.gallery a');


export class App extends Component {
  state = {
    search: '',
    page: 1,
    perPage: 12,
    photos: [],
    totalHits: 0,
    isLoading: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {

      this.setState({
        isLoading: true,
        page: 1,
        photos: [],
      });

      getPhoto(this.state.search, 1, this.state.perPage).then(obj => {
        this.setState({
          photos: obj.hits,
          totalHits: obj.totalHits,
        });
      }).catch(error => {
        console.error(error.message);
      }).finally(() => {
        this.setState({ isLoading: false });
      });
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {

      this.setState({ isLoading: true });

      getPhoto(this.state.search, this.state.page, this.state.perPage).then(obj => {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...obj.hits],
        }));
      }).catch(error => {
        console.error(error.message);
      }).finally(() => {
        this.setState({ isLoading: false });
      });
    }

    if (prevState.photos !== this.state.photos) {
      lightbox.refresh();
    }
  }

  isdisabledBtn = () => {
    return (Math.ceil(this.state.totalHits / this.state.perPage) === this.state.page ? true : false);
  }

  handleSubmit = (search) => {
    this.setState(search);
  }

  pageCount = () => {
    this.setState({
      page: this.state.page + 1
    });
  }

  render() {

    return (

      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery photos={this.state.photos} />
        {this.state.isLoading && <BallTriangle wrapperClass={'loader'} color={"#3f51b5"} height={60} width={60} />}
        {this.state.photos.length ? <Button nextPage={this.pageCount} isdisabledBtn={this.isdisabledBtn()} /> : null}
      </div>

    );
  }
};
