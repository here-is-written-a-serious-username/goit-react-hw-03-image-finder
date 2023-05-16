import React from "react";
import { PropTypes } from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onSelect }) => {

    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={webformatURL} alt='img' onClick={() => onSelect(largeImageURL)} />
        </li>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onSelect: PropTypes.func.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}