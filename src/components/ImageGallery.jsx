import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";


const ImageGallery = ({ photos }) => {

    return (
        <ul className="ImageGallery gallery">
            {photos.map((photo) => (
                <ImageGalleryItem key={photo.id} webformatURL={photo.webformatURL} largeImageURL={photo.largeImageURL} />
            ))}
        </ul>
    )
};


export default ImageGallery;