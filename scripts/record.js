import {DROPDOWN_VALUES} from "./constants.js?v=1753177333";

export function generateRecordHtml(record) {
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

    const levelLabel = `${record["关卡"]} ${record["关卡"] === "开放" ? record["模式"] : ""} ${(record["关数"] || "").replace("_", " ")}`;
    const weaponClass = record["武器"] === "专武" ? "weapon-rare" : "weapon-normal";
    const setCardClass = setCardColorMap(record["日卡"], record["搭档身份"]);
    const partnerClass = partnerColorMap(record["搭档身份"]);

    if (record["加成"] === "<nil>") {
        record["加成"] = "";
    }

    // 主体内容
    return `
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
        <div class="row">
            <div class="col-6 record-grid record-grid-padding-right">
                <div class="record-partner ${partnerClass}">
                    ${record["搭档身份"] || "—"}
                </div>
            </div>
            <div class="col-3 record-grid record-grid-padding-left-right">
                <div class="record-set-card ${setCardClass}">
                    ${record["日卡"] || "—"} ${record["日卡"] === "无套装" ? "" : record["阶数"]}
                </div>
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
                <label class="record-number-label">${record["攻击"] || "—"}</label>
            </div>
            <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                <label class="record-text-label">生命:</label>
                <label class="record-number-label">${record["生命"] || "—"}</label>
            </div>
        </div>
        <div class="row">
            <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                <label class="record-text-label">防御:</label>
                <label class="record-number-label">${record["防御"] || "—"}</label>
            </div>
            <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                <label class="record-text-label">虚弱增伤:</label>
                <label class="record-number-label">${record["虚弱增伤"] || "—"}${record["虚弱增伤"] ? "%" : ""}</label>
            </div>
        </div>
        <div class="row">
            <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                <label class="record-text-label">暴击:</label>
                <label class="record-number-label">${record["暴击"] || "—"}${record["暴击"] ? "%" : ""}</label>
            </div>
            <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                <label class="record-text-label">暴伤:</label>
                <label class="record-number-label">${record["暴伤"] || "—"}${record["暴伤"] ? "%" : ""}</label>
            </div>
        </div>
        <div class="row">
            <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                <label class="record-text-label">誓约增伤:</label>
                <label class="record-number-label">${record["誓约增伤"] || "—"}${record["誓约增伤"] ? "%" : ""}</label>
            </div>
            <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                <label class="record-text-label">誓约回能:</label>
                <label class="record-number-label">${record["誓约回能"] || "—"}${record["誓约回能"] ? "%" : ""}</label>
            </div>
        </div>
        <div class="row">
            <div class="col-6 record-grid record-flex-row record-grid-padding-right">
                <label class="record-text-label">加速回能:</label>
                <label class="record-number-label">${record["加速回能"] || "—"}${record["加速回能"] ? "%" : ""}</label>
            </div>
            <div class="col-6 record-grid record-flex-row record-grid-padding-left">
                <label class="record-text-label">${record["加成"] ? "赛季加成:" : ""}</label>
                <label class="record-number-label">${record["加成"]}${record["加成"] ? "%" : ""}</label>
            </div>
        </div>
    </div>
    `;
}

function setCardColorMap(card, partner) {
    const pinkCards = ["匿光", "神殿", "点染", "掠心", "锋尖"];
    if (pinkCards.includes(card)) {
        return "set-card-pink";
    }

    const purpleCards = ["深海", "斑斓", "寂路"];
    if (purpleCards.includes(card)) {
        return "set-card-purple";
    }

    const redCards = ["拥雪", "夜色", "碧海", "远空", "长昼", "夜誓"];
    if (redCards.includes(card)) {
        return "set-card-red";
    }

    const greenCards = ["逐光", "睱日", "深渊", "离途", "坠浪"];
    if (greenCards.includes(card)) {
        return "set-card-green";
    }

    const yellowCards = ["雾海", "末夜", "弦光", "深林"];
    if (yellowCards.includes(card)) {
        return "set-card-yellow";
    }

    const blueCards = ["永恒", "静谧", "戮夜", "鎏光"];
    if (blueCards.includes(card)) {
        return "set-card-blue";
    }

    if (card === "心晴") {
        const xavier = DROPDOWN_VALUES['沈星回搭档'];
        const zayne = DROPDOWN_VALUES['黎深搭档'];
        const rafayel =  DROPDOWN_VALUES['祁煜搭档'];

        if (xavier.includes(partner)) {
            return "set-card-red";
        }

        if (zayne.includes(partner)) {
            return "set-card-pink";
        }

        if (rafayel.includes(partner)) {
            return "set-card-yellow";
        }
    }

    return "set-card-none";
}

function partnerColorMap(partner) {
    if (partner === "逐光骑士") {
        return "partner-light-seeker";
    }

    if (partner === "光猎") {
        return "partner-lumiere";
    }

    if (partner === "暗蚀国王") {
        return "partner-king-of-darknight";
    }

    if (partner === "永恒先知") {
        return "partner-foreseer";
    }

    if (partner === "九黎司命") {
        return "partner-master-of-fate";
    }

    if (partner === "利莫里亚海神") {
        return "partner-lemurian-sea-god";
    }

    if (partner === "潮汐之神") {
        return "partner-god-of-the-tides";
    }

    if (partner === "深海潜行者") {
        return "partner-abyss-walker";
    }

    if (partner === "无尽掠夺者") {
        return "partner-relentless-conqueror";
    }

    if (partner === "深渊主宰") {
        return "partner-abysm-sovereign";
    }

    if (partner === "远空执舰官") {
        return "partner-farspace-colonel";
    }

    if (partner === "终极兵器X-02") {
        return "partner-ultimate-weapon-X-02";
    }

    return "partner-normal"
}