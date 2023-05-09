const BASE_URL = 'https://pixabay.com/api';
const KEY = 'key=33211320-dec57621770c8fad3b041e20d';
const PARAM = 'image_type=photo&orientation=horizontal'


function getPhoto(search, page) {
    return fetch(`${BASE_URL}/?q=${search}&${KEY}&${PARAM}&per_page=12&page=${page}`)
        .then(response => response.json());
}

export default getPhoto;