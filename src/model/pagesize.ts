export class PageSize {
    pageSize: number;
    pageIndex: number;
    constructor(obj: {
        index: number,
        length: number
    } = { index: 1, length: 10 }) {
        this.pageSize = obj.length;
        this.pageIndex = obj.index;
    }
}