export function showAnnouncement() {
    const announcementKey = "3.0.0"
    if (localStorage.getItem(announcementKey)) return;
    localStorage.setItem(announcementKey, '1');

    prepareAnnouncement();

    const announcement = document.getElementById("announcement");
    announcement.style.display = "block";
}

export function forceDisplayAnnouncement() {
    prepareAnnouncement();

    const announcement = document.getElementById("announcement");
    announcement.style.display = "block";
}

function prepareAnnouncement() {
    const announcementBody = document.getElementById("announcement-general-msg");
    const announcementLatestUpdates = document.getElementById("announcement-latest-updates");
    announcementBody.innerHTML = getAnnouncementBody();
    announcementLatestUpdates.innerText = getAnnouncementLatestUpdates();

}

function getAnnouncementBody() {
    return `猎人小姐你好!
            <br><br>
            欢迎使用深空面板助手 :)
            <br><br>
            【微信小程序现已上线：深空面板助手】
            <br><br>
            <img src="./assets/miniapp.JPG" alt="微信小程序二维码" style="max-width: 200px; height: auto; display: block; margin: 10px auto;">
            <br>
            网页端会稍晚于小程序端更新，小程序额外提供用户相关服务<br>
            
            公告可前往本助手首页右上角重新查看`
}

function getAnnouncementLatestUpdates() {
    return `最新更新
            - 2025-09-24：支持战力显示与战斗建议
            - 2025-08-16：支持波动轨道星级
            - 2025-07-23：支持卡总等级及备注
            - 2025-07-22：支持沈星回新搭档身份及日卡，增加光轨上限
            - 2025-07-07：微信小程序正式上线！搜：深空面板助手
            - 2025-07-07：支持识图功能
            - 2025-07-01：支持新的关卡模式
            - 2025-07-01：增加重置表单按钮`
}