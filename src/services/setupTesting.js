// @flow
import { beginRealTesting, beginTesting } from '../forms';
import { URL } from '../lib/constants';
import userDataCorrect from '../lib/userDataCorrect';

async function setupTesting(payload = {}) {
  let response;
  await init();
  if (payload.mode === 'real') {
    response = await request(beginRealTesting(payload));
  } else {
    response = await request(beginTesting());
  }
  const content = await response.text();
  if (!userDataCorrect(content)) {
    return { status: 404 };
  }
  return { status: 200 };
}

async function init() {
  return fetch(URL, {
    method: 'get',
    headers: {},
    credentials: 'include',
  });
}

async function request(form) {
  return fetch(URL, {
    method: 'post',
    headers: {},
    body: form,
  });
}

export default setupTesting;
