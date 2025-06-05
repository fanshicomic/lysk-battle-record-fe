export function initCustomSelects({
                                      onSelect = () => {},
                                      onOpen = () => {},
                                      onClose = () => {},
                                  } = {}) {
    const selects = document.querySelectorAll('.custom-select');

    selects.forEach((select) => {
        const selected = select.querySelector('.selected');
        const options = select.querySelector('.options');

        if (!selected || !options) return;

        // 打开/关闭下拉
        selected.addEventListener('click', () => {
            const isOpen = select.classList.toggle('open');

            if (isOpen) {
                selected.style.borderBottomLeftRadius = '0';
                selected.style.borderBottomRightRadius = '0';
                selected.style.borderBottom = '0';
                options.style.borderTop = '0';
                onOpen(select);
            } else {
                selected.style.borderBottomLeftRadius = '12px';
                selected.style.borderBottomRightRadius = '12px';
                selected.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
                onClose(select);
            }
        });

        // 选择一个 option
        options.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                selected.textContent = e.target.textContent;
                select.classList.remove('open');
                selected.style.borderBottomLeftRadius = '12px';
                selected.style.borderBottomRightRadius = '12px';
                selected.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
                onSelect(e.target, select);
            }
        });

        // 点击外部关闭
        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
                selected.style.borderBottomLeftRadius = '12px';
                selected.style.borderBottomRightRadius = '12px';
                selected.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
                onClose(select);
            }
        });
    });
}
