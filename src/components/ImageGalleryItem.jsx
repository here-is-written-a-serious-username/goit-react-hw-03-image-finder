import React from "react";


const ImageGalleryItem = ({ webformatURL, largeImageURL, onSelect }) => {

    return (
        <li className="ImageGalleryItem">
            <a onClick={() => onSelect(largeImageURL)}><img className="ImageGalleryItem-image" src={webformatURL} alt='img' /></a>
        </li>
    )
}

export default ImageGalleryItem;