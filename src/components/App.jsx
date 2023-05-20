import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import getPhoto from '../helpers/getPhoto'
import Button from './Button';
import Modal from './Modal';
import STATUS from 'constants/status.constants';

import { BallTriangle } from 'react-loader-spinner'

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// let lightbox = new SimpleLightbox('.gallery a');


export class App extends Component {
  state = {
    search: '',
    page: 1,
    perPage: 12,
    photos: [],
    totalHits: 0,
    status: STATUS.idle, // 'idle', 'loading', 'success', 'error'
    showModal: false,
    selectedPhoto: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { search, page, perPage, selectedPhoto } = this.state;

    if (prevState.search !== search) {

      this.setState({
        status: STATUS.loading,
        page: 1,
        photos: [],
      });

      this.fetchData({ search, perPage });
    }

    if (prevState.page !== page && page !== 1) {

      this.setState({ status: STATUS.loading });
      this.fetchData({ search, page, perPage });
    }

    // if (prevState.photos !== this.state.photos) {
    //   lightbox.refresh();
    // }

    // if (prevState.selectedPhoto !== selectedPhoto) {
    //   this.setState({ showModal: true, });
    // }
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
      this.setState({ status: STATUS.success });
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
    const { photos, status, showModal, selectedPhoto } = this.state;
    return (

      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />

        {photos.length ? <ImageGallery photos={photos} onSelect={this.selectPhoto} onOpen={this.toggleModal} /> : null}

        {status === STATUS.loading && <BallTriangle wrapperClass={'loader'} color={"#3f51b5"} height={60} width={60} />}

        {(status === STATUS.success && photos.length !== 0) && <Button nextPage={this.pageCount} isdisabledBtn={this.isdisabledBtn()} />}

        {showModal && (<Modal onClose={this.toggleModal}>
          <img src={selectedPhoto} alt="big img" />
        </Modal>)}
      </div>

    );
  }
};
