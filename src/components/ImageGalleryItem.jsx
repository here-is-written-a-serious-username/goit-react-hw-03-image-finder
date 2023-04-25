import React from "react";



const ImageGalleryItem = ({ sourse }) => {

    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={sourse} alt={sourse} />
        </li>
    )
}

export default ImageGalleryItem;