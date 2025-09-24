import { CompanionLabel } from '../companion-label/companion-label.js';

class BattleSuggestion extends HTMLElement {
    constructor() {
        super();
        this._data = {
            lowestCP: 0,
            suggestedCP: 0,
            attackPattern: '',
            attackPatternPercentage: 0,
            topPairs: []
        };
        this.attachShadow({ mode: 'open' });
        this._render();
    }

    static get observedAttributes() {
        return ['lowest-cp','suggested-cp','attack-pattern','attack-pattern-percentage','pairs'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'lowest-cp':
                this._data.lowestCP = Number(newValue) || 0; break;
            case 'suggested-cp':
                this._data.suggestedCP = Number(newValue) || 0; break;
            case 'attack-pattern':
                this._data.attackPattern = newValue || ''; break;
            case 'attack-pattern-percentage':
                this._data.attackPatternPercentage = Number(newValue) || 0; break;
            case 'pairs':
                try {
                    this._data.topPairs = JSON.parse(newValue) || [];
                } catch(e) {
                    this._data.topPairs = [];
                }
                break;
        }
        this._render();
    }

    set data(val) {
        if (!val || !val.cps || val.cps.length === 0) {
            this._data = {
                lowestCP: 0,
                suggestedCP: 0,
                attackPattern: '',
                attackPatternPercentage: 0,
                topPairs: []
            };
            this._render();
            return;
        }

        const lowestCp = Math.min(...val.cps);
        const suggestedCp = val.suggested_cp;

        const totalPatterns = val.crit + val.weak;
        let attackPattern = '-';
        let attackPatternPercentage = 0;
        if (totalPatterns > 0) {
            if (val.crit > val.weak) {
                attackPattern = '暴击';
                attackPatternPercentage = (val.crit / totalPatterns) * 100;
            } else {
                attackPattern = '虚弱';
                attackPatternPercentage = (val.weak / totalPatterns) * 100;
            }
        }

        const totalPairs = val.companion_setcard_pairs.reduce((sum, p) => sum + p.count, 0);
        const pairs = val.companion_setcard_pairs.map(p => ({
            companion: p.companion,
            set_card: p.set_card,
            percentage: totalPairs > 0 ? (p.count / totalPairs) * 100 : 0
        }));

        this._data = {
            lowestCP: lowestCp,
            suggestedCP: suggestedCp,
            attackPattern: attackPattern,
            attackPatternPercentage: attackPatternPercentage,
            topPairs: pairs
        };

        this._render();
    }

    get data() {
        return this._data;
    }

    _formatPercent(v) {
        if (v === null || v === undefined || isNaN(v)) return '0';
        return String(Math.round(Number(v)));
    }

    _render() {
        if (!this.shadowRoot) return;
        const d = this._data;
        const hasData = d.lowestCP !== 0;
        const styleHref = this.getAttribute('style-href') || './components/battle-suggestion/battle-suggestion.css';
        const pairsHtml = d.topPairs.slice(0,3).map(p => `
            <div class="battle-suggestion-row pair-row">
                <div class="w-50"><companion-label companion="${p.companion || ''}"></companion-label></div>
                <div class="w-25"><span class="set-card-label" data-card="${p.set_card || ''}">${p.set_card || '-'}</span></div>
                <div class="w-25 percentage-label">${this._formatPercent(p.percentage)}%</div>
            </div>
        `).join('');
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${styleHref}">
            <div class="container">
              ${!hasData ? `
                <div class="empty-block">
                  <div>当前关卡无通关数据</div>
                  <div>欢迎上传━(*｀∀´*)ノ亻!</div>
                </div>
              ` : `
                <div class="content-block">
                  <div class="h2 title">通关建议</div>
                  <div class="suggestion-container">
                    <div class="line">当前库中通关最低战力值为：<span class="value-em">${d.lowestCP}</span></div>
                    <div class="line">建议猎人小姐调整战力值至：<span class="value-em">${d.suggestedCP}</span> 以上</div>
                    <div class="hr"></div>
                    <div class="battle-suggestion-row w-100 space-between attack-pattern-row">
                      <div>伤害流派选择多为：<span>${d.attackPattern || '-'}</span></div>
                      <div class="percentage-label">${this._formatPercent(d.attackPatternPercentage)}%</div>
                    </div>
                    <div class="pairs-section">
                      <div class="pairs-title">大家常用的搭档日卡组合为：</div>
                      <div class="combi-section">${pairsHtml || '<div class=\'battle-suggestion-row pair-row\'><div class=\'w-100\'>暂无数据</div></div>'}</div>
                    </div>
                  </div>
                </div>
              `}
            </div>
        `;
    }
}

customElements.define('battle-suggestion', BattleSuggestion);

export { BattleSuggestion };
