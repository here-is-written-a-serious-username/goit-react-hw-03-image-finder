import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import { PropTypes } from 'prop-types';

const ImageGallery = ({ photos, onSelect }) => {

    return (
        <ul className="ImageGallery gallery">
            {photos.map((photo) => (
                <ImageGalleryItem key={photo.id} webformatURL={photo.webformatURL} largeImageURL={photo.largeImageURL} onSelect={onSelect} />
            ))}
        </ul>
    )
};


export default ImageGallery;


ImageGallery.propTypes = {
    onSelect: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired).isRequired
}