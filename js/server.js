import { getServerURL } from './config.js';
const serverURL = getServerURL();
const loadData = (onSuccess, onError) => {
  fetch(`${serverURL}/data`)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((data) => { onSuccess(data); });
      } else { onError(); }
    })
    .catch(() => { onError(); });
};

const postData = (onSuccess, onError, bodyData) => {
  fetch(serverURL, {
    method: 'POST',
    body: bodyData,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => { onError(); });
};

export { loadData, postData };
