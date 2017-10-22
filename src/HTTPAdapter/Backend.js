import 'babel-polyfill';
import 'isomorphic-fetch';

const BackendUrl = 'http://localhost:3001';

export function fetchJson(path) {
    const url = `${BackendUrl}${path}`;

    return fetch(url)
        .then(response => response.json())
        .catch(exception =>
            console.error('parsing failed', exception));
}