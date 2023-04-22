import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { RequestServer } from './requestServer';
import { markup } from './markup';
import { LoadMoreButton } from './loadMoreButton';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
    searchButton: document.querySelector('#search-form button'),
};
const requestServer = new RequestServer();
const onloadMoreButton = new LoadMoreButton({
    isHiden: true,
    disabled: true,
    loading: false,
    buttonAdress: refs.loadMoreButton
});
let totalImagesUploaded = 40;

onloadMoreButton.buttonState({});

refs.form.addEventListener('submit', onSubmitForm);
refs.loadMoreButton.addEventListener('click', onSumbitLoadMore);

async function onSubmitForm(event) {
    event.preventDefault();
    const { searchQuery } = event.currentTarget.elements;
    if (!searchQuery.value.trim()) {
        Notify.info('Please, enter data to search!');
        return;
    }
refs.searchButton.disabled = true;
requestServer.params.page = 0;
refs.gallary.innerHTML = '';
onloadMoreButton.buttonState({
    isHiden: false,
    loading: true,
});

try {
    const response = await requestServer.onRequestServer(searchQuery.value);
    const { hits, totalHits } = response.data;

    if(!totalHits) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    onloadMoreButton.buttonState({isHiden: true});

    refs.searchButton.disabled = false;
    return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`)
    refs.gallery.insertAdjacentHTML("beforeend", markup(hits));
    refs.searchButton.disabled = false;
    

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();

    if (totalHits <= 40) {
        onloadMoreButton.buttonState({
            isHiden: true,
            disabled: true,
        })
    } else {
        onloadMoreButton.buttonState({
            isHiden: false,
            disabled: false,
            loading: false,
        });
    }
} catch(error) {
    console.log(error);
};
};




 