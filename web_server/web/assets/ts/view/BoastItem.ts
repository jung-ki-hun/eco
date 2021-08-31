/**
 * 
 * @param img_path 게시글 미리보기 이미지
 * @param title 게시글 타이틀
 * @param tagElement 게시글 아이템 태그
 * @returns {itemImg:HTMLElement, itemTitle:HTMLElement}
 */
export default function(img_path:string, title:string):Object {
    const boardImg:HTMLElement = document.createElement('img');
    const boardTitle:HTMLElement = document.createElement('span')

    return {
        itemImg: boardImg,
        itemTitle: boardTitle
    };
}