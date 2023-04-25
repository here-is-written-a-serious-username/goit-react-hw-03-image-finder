import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";


const ImageGallery = ({ aaa }) => {

    return (
        <ul className="ImageGallery">
            {aaa.map((a) => (
                <ImageGalleryItem key={a.webformatURL} sourse={a.webformatURL} />
            ))
            }
        </ul>
    )
};


export default ImageGallery;