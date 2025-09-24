import {DROPDOWN_VALUES} from "../../scripts/constants.js?v=1755282627";
import { SetCardLabel } from '../set-card-label/set-card-label.js?v=1758727953';

class RecordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(record) {
        this.render(record);
    }

    getChampionshipStartDate(dateString) {
        const startDate = new Date('2025-06-02T00:00:00Z');
        const givenDate = new Date(dateString);

        // Calculate the difference in milliseconds
        const diff = givenDate.getTime() - startDate.getTime();

        // Calculate the number of 14-day periods
        const fourteenDaysInMillis = 14 * 24 * 60 * 60 * 1000;
        const periods = Math.floor(diff / fourteenDaysInMillis);

        // Calculate the start date of the round
        const roundStartDate = new Date(
            startDate.getTime() + periods * fourteenDaysInMillis
        );

        // Format the date to YYYY-MM-DD
        const year = roundStartDate.getFullYear();
        const month = String(roundStartDate.getMonth() + 1).padStart(2, '0');
        const day = String(roundStartDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    generateStarRating(starLevel) {
        let starRank = 0;
        switch (starLevel) {
            case '三星':
                starRank = 3;
                break;
            case '二星':
                starRank =  2;
                break;
            case '一星':
                starRank =  1;
                break;
            default:
                starRank =  0;
        }

        let stars = '';
        for (let i = 0; i < starRank; i++) {
            stars += `<img class="star-icon" src="assets/star-fill.svg" width="20" height="20" style="color: #f7b257;" alt="filled star">`;
        }

        return `<div class="star-rank display-row">${stars}</div>`;
    }

    render(record) {
        const isMatching = record["对谱"] === "顺";
        const matchingClass = isMatching ? "is-matching" : "is-not-matching";
        const matchingLabel = record["对谱"];

        const matchingBonus = Number(record["对谱加成"]) || 0;
        const filledCount = Math.round(Math.min(matchingBonus, 30) / 5);
        const circles = Array.from({length: 6}).map((_, i) =>
            `<svg class="bi record-matching-circle ${matchingClass}" width="15" height="15">
            <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#${i < filledCount ? 'circle-fill' : 'circle'}"/>
        </svg>`
        ).join("");

        const hasMatchingInfo = record["对谱"] !== "不确定" && record["对谱加成"] !== "不确定";

        let levelLabel = `${record["关卡"]} ${record["关卡"] === "开放" ? record["模式"] : ""} ${(record["关数"] || "").replace("_", " ")}`;
        if (record['加成'] !== '') {
            let time = this.getChampionshipStartDate(record['时间']);
            levelLabel = time + '期 ' + levelLabel;
        }
        const weaponClass = record["武器"] === "专武" ? "weapon-rare" : "weapon-normal";

        if (record["加成"] === "<nil>") {
            record["加成"] = "";
        }

        // Combat power calculation variables
        const combatPowerDetails = record['战力值'];
        const noBuffedCP = (!combatPowerDetails || combatPowerDetails['Score'] === '0') ? 0 : Number(combatPowerDetails['Score']) || 0;
        const buffedCP = (!combatPowerDetails || combatPowerDetails['BuffedScore'] === '0') ? 0 : Number(combatPowerDetails['BuffedScore']) || 0;
        const critCP = !combatPowerDetails ? 0 : Number(combatPowerDetails['CritScore']) || 0;
        const weakenCP = !combatPowerDetails ? 0 : Number(combatPowerDetails['WeakenScore']) || 0;

        const critWeakenTotal = critCP + weakenCP;
        const critCPPercentage = critWeakenTotal === 0 ? '0.0' : ((critCP / critWeakenTotal) * 100).toFixed(0);
        const weakenCPPercentage = critWeakenTotal === 0 ? '0.0' : ((weakenCP / critWeakenTotal) * 100).toFixed(0);
        const critCPProgressBarWidth = critWeakenTotal === 0 ? '0.0' : ((critCP / critWeakenTotal) * 30).toFixed(1);
        const weakenCPProgressBarWidth = critWeakenTotal === 0 ? '0.0' : ((weakenCP / critWeakenTotal) * 30).toFixed(1);

        const cpEvaluation = !combatPowerDetails ? '' : combatPowerDetails['Evaluation'];
        let cpEvaluationClass = '';
        if (cpEvaluation) {
            switch (cpEvaluation) {
                case '溢出':
                    cpEvaluationClass = 'cp-eval-high';
                    break;
                case '标准':
                    cpEvaluationClass = 'cp-eval-mid';
                    break;
                case '极限':
                    cpEvaluationClass = 'cp-eval-low';
                    break;
            }
        }

        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css?v=1750166732" rel="stylesheet">
            <link rel="stylesheet" href="./components/record/record.css">
            <div class="record-container">
                ${record['模式'] === '波动' ? this.generateStarRating(record['星级']) : ''}
                <div class="w-100 record">
                    <div class="row">
                        ${hasMatchingInfo ? `<div class="col-6 record-matching-detail record-grid">
                            <label class="record-matching ${matchingClass}">${matchingLabel}</label>
                            ${circles}
                        </div>` : `<div class="col-6 record-matching-detail record-grid">无对谱信息</div>`}
                        <div class="col-6 record-level-detail record-grid">
                            <label>${levelLabel}</label>
                        </div>
                    </div>
                    ${noBuffedCP !== 0 ? `
                    <div class="row cp-container">
                        <div class="w-50 cp-left-column record-cp-detail">
                            <label class="record-cp-label">${buffedCP}</label>
                            <div class="record-raw-cp-label-row">
                                ${noBuffedCP}
                                ${cpEvaluation ? `<div class="cp-evaluation-label ${cpEvaluationClass}">${cpEvaluation}</div>` : ''}
                                <svg class="info cp-info-icon" width="11px" height="11px">
                                    <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#question-circle"/>
                                </svg>
                            </div>
                        </div>
                        <div class="w-50 cp-right-column">
                            <div class="cp-right-row record-grid-padding-left">
                                <label class="record-text-label">暴击期: ${critCPPercentage}%</label>
                                <div class="record-cp-progress-bar record-value-label" style="background: linear-gradient(to right, #f4d266 0%, #f6cd63 100%); width: ${critCPProgressBarWidth}%"></div>
                            </div>
                            <div class="cp-right-row record-grid-padding-left record-cp-detail">
                                <label class="record-text-label">虚弱期: ${weakenCPPercentage}%</label>
                                <div class="record-cp-progress-bar record-value-label" style="background: linear-gradient(to right, #b0dee9 0%, #87c4d2 100%); width: ${weakenCPProgressBarWidth}%"></div>
                            </div>
                        </div>
                    </div>
                    ` : `
                    <div class="row">
                        <div class="w-50 record-grid record-cp-detail">未支持的搭档</div>
                        <div class="w-50 record-grid record-cp-detail"></div>
                    </div>
                    `}
                    <div class="row">
                        <div class="col-6 record-grid record-grid-padding-right">
                            <companion-label companion="${record["搭档身份"] || ""}"></companion-label>
                        </div>
                        <div class="col-3 record-grid record-grid-padding-left-right">
                            <set-card-label card="${record["日卡"] || ''}" stage="${record["阶数"] || ''}" companion="${record["搭档身份"] || ''}"></set-card-label>
                        </div>
                        <div class="col-3 record-grid record-grid-padding-left">
                            <div class="record-weapon ${weaponClass}">
                                ${record["武器"] || "—"}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                            <label class="record-text-label">攻击:</label>
                            <label class="record-value-label">${record["攻击"] || "—"}</label>
                        </div>
                        <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                            <label class="record-text-label">生命:</label>
                            <label class="record-value-label">${record["生命"] || "—"}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                            <label class="record-text-label">防御:</label>
                            <label class="record-value-label">${record["防御"] || "—"}</label>
                        </div>
                        <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                            <label class="record-text-label">虚弱增伤:</label>
                            <label class="record-value-label">${record["虚弱增伤"] || "—"}${record["虚弱增伤"] ? "%" : ""}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                            <label class="record-text-label">暴击:</label>
                            <label class="record-value-label">${record["暴击"] || "—"}${record["暴击"] ? "%" : ""}</label>
                        </div>
                        <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                            <label class="record-text-label">暴伤:</label>
                            <label class="record-value-label">${record["暴伤"] || "—"}${record["暴伤"] ? "%" : ""}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                            <label class="record-text-label">誓约增伤:</label>
                            <label class="record-value-label">${record["誓约增伤"] || "—"}${record["誓约增伤"] ? "%" : ""}</label>
                        </div>
                        <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                            <label class="record-text-label">誓约回能:</label>
                            <label class="record-value-label">${record["誓约回能"] || "—"}${record["誓约回能"] ? "%" : ""}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                            <label class="record-text-label">加速回能:</label>
                            <label class="record-value-label">${record["加速回能"] || "—"}${record["加速回能"] ? "%" : ""}</label>
                        </div>
                        <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                            <label class="record-text-label">卡总等级:</label>
                            <label class="record-value-label">${record["卡总等级"] || "—"}</label>
                        </div>
                    </div> 
                    ${record["加成"] ? `
                    <div class="row">
                        <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                            <label class="record-text-label">赛季加成:</label>
                            <label class="record-value-label">${record["加成"]}%</label>
                        </div>
                        <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                        </div>
                    </div>
                    ` : ""}
                    ${record["备注"] ? `
                    <div class="row">
                        <label class="note">备注：${record["备注"]}</label>
                    </div>
                    ` : ""}
                </div>
            </div>
        `;
    }
}

customElements.define('record-component', RecordComponent);
export { RecordComponent };
