export function initializeFooter() {
    const openPopupButton = document.getElementById('open-popup');
    const popupPanel = document.getElementById('popup-panel');
    const closePopupButton = document.querySelector('.close-popup');

    openPopupButton.addEventListener('click', () => {
        popupPanel.classList.remove('d-none');
    });

    closePopupButton.addEventListener('click', () => {
        popupPanel.classList.add('d-none');
    });

    popupPanel.addEventListener('click', (event) => {
        if (event.target === popupPanel) {
            popupPanel.classList.add('d-none');
        }
    });
}