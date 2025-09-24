const InfoComponent = (function () {
    let infoToastElement = null;
    let titleElement = null;
    let bodyElement = null;

    function create() {
        if (document.getElementById('info-toast-component')) {
            return;
        }

        const toast = document.createElement('div');
        toast.id = 'info-toast-component';
        toast.className = 'info-toast';
        toast.style.display = 'none'; // Initially hidden

        const header = document.createElement('div');
        header.className = 'info-toast-header';

        titleElement = document.createElement('span');
        titleElement.className = 'info-toast-title';

        const closeButton = document.createElement('div');
        closeButton.className = 'info-toast-btn-close';
        closeButton.onclick = hide;

        header.appendChild(titleElement);
        header.appendChild(closeButton);

        const body = document.createElement('div');
        body.className = 'info-toast-body';

        bodyElement = document.createElement('div');
        bodyElement.className = 'info-text';

        body.appendChild(bodyElement);
        toast.appendChild(header);
        toast.appendChild(body);

        document.body.appendChild(toast);
        infoToastElement = toast;
    }

    function show(title, body) {
        if (!infoToastElement) {
            create();
        }
        titleElement.textContent = title;
        bodyElement.textContent = body;
        infoToastElement.style.display = 'block';
    }

    function hide() {
        if (infoToastElement) {
            infoToastElement.style.display = 'none';
        }
    }

    // Create the component as soon as the script loads
    document.addEventListener('DOMContentLoaded', create);

    return {
        show: show,
        hide: hide,
    };
})();

window.InfoComponent = InfoComponent;
