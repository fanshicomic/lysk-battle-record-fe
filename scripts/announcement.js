export function showAnnouncement() {
    const announcementKey = "2.1.0"
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
    announcementBody.innerText = getAnnouncementBody();
    announcementLatestUpdates.innerText = getAnnouncementLatestUpdates();

}

function getAnnouncementBody() {
    return `猎人小姐你好!
    
            欢迎使用深空面板助手 :)
            
            【微信小程序现已上线：深空面板助手】
            
            库中的面板会用于正在开发的数据分析功能，感谢你的每一条记录分享~
            更多功能也在开发进程中，敬请期待
            公告可前往本助手首页右上角重新查看`
}

function getAnnouncementLatestUpdates() {
    return `最新更新
            - 2025-07-22：支持沈星回新搭档身份及日卡
            - 2025-07-07：微信小程序正式上线！搜：深空面板助手
            - 2025-07-07：支持识图功能
            - 2025-07-01：支持新的关卡模式
            - 2025-07-01：增加重置表单按钮`
}