import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import getPhoto from './getPhoto'
import Button from './Button';
import Modal from './Modal';

import { BallTriangle } from 'react-loader-spinner'

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// let lightbox = new SimpleLightbox('.gallery a');

// const STATUS = {
//   idle: 'idle',
//   loading: 'loading',
//   success: 'success',
//   error: 'error',
// };

export class App extends Component {
  state = {
    search: '',
    page: 1,
    perPage: 12,
    photos: [],
    totalHits: 0,
    isLoading: false,
    // status: STATUS.idle, // 'idle', 'loading', 'success', 'error'
    showModal: false,
    selectedPhoto: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page, perPage, selectedPhoto } = this.state;

    if (prevState.search !== search) {

      this.setState({
        isLoading: true,
        page: 1,
        photos: [],
      });

      this.fetchData({ search, perPage });
    }

    if (prevState.page !== page && page !== 1) {

      this.setState({ isLoading: true });
      this.fetchData({ search, page, perPage });
    }

    // if (prevState.photos !== this.state.photos) {
    //   lightbox.refresh();
    // }
    if (prevState.selectedPhoto !== selectedPhoto) {
      this.setState({ showModal: true, });
    }

  }

  fetchData = ({ search, page = 1, perPage }) => {
    getPhoto(search, page, perPage).then(obj => {
      this.setState(prevState => ({
        photos: [...prevState.photos, ...obj.hits],
        totalHits: obj.totalHits,
      }));
    }).catch(error => {
      console.error(error.message);
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  isdisabledBtn = () => {
    const { totalHits, page, perPage } = this.state;
    return (Math.ceil(totalHits / perPage) === page ? true : false);
  }

  handleSubmit = (search) => {
    this.setState(search);
  }

  pageCount = () => {
    this.setState({
      page: this.state.page + 1
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectPhoto = link => {
    this.setState({ selectedPhoto: link });
  };

  render() {
    const { photos, isLoading, showModal, selectedPhoto } = this.state;
    return (

      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery photos={photos} onSelect={this.selectPhoto} />

        {isLoading && <BallTriangle wrapperClass={'loader'} color={"#3f51b5"} height={60} width={60} />}

        {photos.length ? <Button nextPage={this.pageCount} isdisabledBtn={this.isdisabledBtn()} /> : null}

        {showModal && (<Modal onClose={this.toggleModal}>
          <img src={selectedPhoto} alt="big img" />
        </Modal>)}
      </div>

    );
  }
};
