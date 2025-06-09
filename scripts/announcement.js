export function showAnnouncement() {
    if (sessionStorage.getItem('announcementShown')) return;
    sessionStorage.setItem('announcementShown', '1');

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
            更多功能如筛选、排序、截图识别也在开发进程中，敬请期待`
}

function getAnnouncementLatestUpdates() {
    return `最新更新
            - 2025-06-09：新增系统公告功能+防御/生命搭档上传数据验证
            - 2025-06-07：更具体的上传数据验证
            - 2025-06-06：全新的UI上线`
}