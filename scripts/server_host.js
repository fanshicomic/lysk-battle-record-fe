let API_BASE;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '192.168.0.139') {
    API_BASE = 'http://127.0.0.1:8080/';
} else {
    API_BASE = 'https://lysk-battle-record-426168069563.asia-southeast1.run.app/';
}
// API_BASE = 'https://lysk-battle-record-426168069563.asia-southeast1.run.app/';
export { API_BASE };