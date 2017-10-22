import 'babel-polyfill';
import 'isomorphic-fetch';

const BackendUrl = 'http://localhost:3001';

export function fetchJson(path) {
    const url = `${BackendUrl}${path}`;

    return fetch(url)
        .then(response => response.json())
        .catch(exception =>
            console.error('parsing failed during get', exception));
}

export function sendJson(method, path, body) {
    const url = `${BackendUrl}${path}`;

    return fetch(url, {
        method: method,
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ) .catch(exception =>
        console.error('parsing failed during send', exception)
    );


}