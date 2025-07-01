export function showAnnouncement() {
    const announcementKey = "1.3.0"
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
            库中的面板会用于正在开发的数据分析功能，感谢你的每一条记录分享~
            更多功能如筛选、排序、截图识别也在开发进程中，敬请期待
            小程序开发进度：~75%
            公告可前往本助手首页右上角重新查看`
}

function getAnnouncementLatestUpdates() {
    return `最新更新
            - 2025-07-01：支持新的关卡模式（预计未来非开放轨道也会增加波动模式，所以调整为所有关卡都支持双模式。）
            - 2025-07-01：增加重置表单按钮
            - 2025-06-25：增加坠浪四星日卡
            - 2025-06-17：支持搭档利莫里亚海神
            - 2025-06-10：表单阶数显示优化
            - 2025-06-09：新增系统公告功能+防御/生命搭档上传数据验证`
}