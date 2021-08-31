/**
 *
 * @param img_path 게시글 미리보기 이미지
 * @param title 게시글 타이틀
 * @param tagElement 게시글 아이템 태그
 * @returns {itemImg:HTMLElement, itemTitle:HTMLElement}
 */
export default function (img_path, title) {
    const boardImg = document.createElement('img');
    const boardTitle = document.createElement('span');
    return {
        itemImg: boardImg,
        itemTitle: boardTitle
    };
}
//# sourceMappingURL=BoastItem.js.map