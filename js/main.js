import {ThumbnailsRendering} from './thumbnail-rendering.js';
import {setUserThumbnailsClick} from './big-image-rendering.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './page-form.js';


getData()
  .then((data) => {
    ThumbnailsRendering(data);
    setUserThumbnailsClick(data);
  })
  .catch((error) => {

    showAlert(error.message);
  });


