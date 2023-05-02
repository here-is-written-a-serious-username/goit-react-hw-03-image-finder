import React from "react";


const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {

    return (
        <li className="ImageGalleryItem">
            <a href={largeImageURL}><img className="ImageGalleryItem-image" src={webformatURL} alt='img' /></a>
        </li>
    )
}

export default ImageGalleryItem;