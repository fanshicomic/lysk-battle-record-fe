import * as constants from './constants.js';

export async function apiPost(endpoint, data) {
    const res = await fetch(`${constants.API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function apiGet(endpoint, params = {}) {
    const url = new URL(`${constants.API_BASE}${endpoint}`);
    Object.entries(params).forEach(([key, val]) => url.searchParams.append(key, val));
    const res = await fetch(url.toString());
    return res.json();
}