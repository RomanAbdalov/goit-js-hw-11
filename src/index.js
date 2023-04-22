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





 