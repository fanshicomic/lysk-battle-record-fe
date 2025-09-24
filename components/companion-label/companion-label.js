class CompanionLabel extends HTMLElement {
    static get observedAttributes() {
        return ['companion'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'companion' && oldValue !== newValue) {
            this.render();
        }
    }

    getPartnerColorMap(companion) {
        const map = {
            '逐光骑士': 'companion-light-seeker',
            '光猎': 'companion-lumiere',
            '暗蚀国王': 'companion-king-of-darknight',
            '永恒先知': 'companion-foreseer',
            '九黎司命': 'companion-master-of-fate',
            '终末之神': 'companion-god-of-annihilation',
            '利莫里亚海神': 'companion-lemurian-sea-god',
            '潮汐之神': 'companion-god-of-the-tides',
            '深海潜行者': 'companion-abyss-walker',
            '无尽掠夺者': 'companion-relentless-conqueror',
            '深渊主宰': 'companion-abysm-sovereign',
            '远空执舰官': 'companion-farspace-colonel',
            '终极兵器X-02': 'companion-ultimate-weapon-X-02'
        };
        return map[companion] || 'companion-normal';
    }

    render() {
        const companion = this.getAttribute('companion') || '';
        const colorClass = this.getPartnerColorMap(companion);

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./components/companion-label/companion-label.css">
            <span class="record-companion ${colorClass}">${companion}</span>
        `;
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('companion-label', CompanionLabel);
export { CompanionLabel };
