import { endTesting } from '../forms';

const URL = 'http://81.23.108.42/pers_test/';

async function leaveTesting() {
  const form = endTesting();
  return fetch(URL, {
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
    credentials: 'include',
  });
}

export default leaveTesting;
