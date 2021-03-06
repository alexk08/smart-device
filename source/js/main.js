'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var body = document.querySelector('body');
  var requestCallButton = body.querySelector('.page-header__call-button');
  var popup = body.querySelector('.modal-callback');
  var closeButton = popup.querySelector('.modal-callback__close-button');
  var overlayDark = body.querySelector('.overlay');

  var formCallback = document.querySelector('.modal-callback__form');
  var nameField = formCallback.querySelector('#callback-name');
  var phoneField = formCallback.querySelector('#callback-phone');
  var messageField = formCallback.querySelector('#callback-message');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';
  var storageMessage = '';

  try {
    storageName = localStorage.getItem('nameField');
    storagePhone = localStorage.getItem('phoneField');
    storageMessage = localStorage.getItem('messageField');
  } catch (err) {
    isStorageSupport = false;
  }

  var openPopup = function () {
    popup.classList.add('js-show');
    overlayDark.classList.add('js-show');
    body.classList.add('js-modal-open');
    document.addEventListener('keydown', onDocumentEscPress);
    body.addEventListener('click', onBodyClick);

    nameField.focus();

    if (storageName && storagePhone && storageMessage) {
      nameField.value = storageName;
      phoneField.value = storagePhone;
      messageField.value = storageMessage;
    }
  };

  var closePopup = function () {
    popup.classList.remove('js-show');
    overlayDark.classList.remove('js-show');
    body.classList.remove('js-modal-open');
    document.removeEventListener('keydown', onDocumentEscPress);
    body.removeEventListener('click', onBodyClick);
  };

  var onDocumentEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var onBodyClick = function (evt) {
    if (evt.target === closeButton || evt.target === overlayDark) {
      closePopup();
    }
  };

  var onFormSubmit = function () {
    if (isStorageSupport) {
      localStorage.setItem('nameField', nameField.value);
      localStorage.setItem('phoneField', phoneField.value);
      localStorage.setItem('messageField', messageField.value);
    }
  };

  requestCallButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  formCallback.addEventListener('submit', onFormSubmit);

  var navElement = document.querySelector('.footer-nav');
  var contactsElement = document.querySelector('.footer-contacts');

  navElement.classList.remove('no-js');
  contactsElement.classList.remove('no-js');

  var toggleAccodionItem = function (clickedElement, nextElement, evt) {
    if (evt.target.classList.contains('js-accordion-button')) {
      clickedElement.classList.toggle('js-accordion-item-close');
      nextElement.classList.add('js-accordion-item-close');
    }
  };

  navElement.addEventListener('click', function (evt) {
    toggleAccodionItem(navElement, contactsElement, evt);
  });

  contactsElement.addEventListener('click', function (evt) {
    toggleAccodionItem(contactsElement, navElement, evt);
  });

  var feedbackPhone = document.querySelector('.feedback__input--phone');
  var modalPhone = document.querySelector('.modal-callback__input--phone');
  var mask = {
    mask: '+{7}(000)000-00-00',
  };

  IMask(feedbackPhone, mask);
  IMask(modalPhone, mask);

})();
