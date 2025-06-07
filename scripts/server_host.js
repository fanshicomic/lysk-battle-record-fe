let API_BASE;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_BASE = 'http://192.168.0.139:8080/';
} else {
    API_BASE = 'https://lysk-battle-record-426168069563.asia-southeast1.run.app/';
}
export { API_BASE };