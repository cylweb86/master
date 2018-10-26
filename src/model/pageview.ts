export class PageView {
  index: number;
  length: number;
  constructor(obj: {
    index: number,
    length: number
  } = { index: 1, length: 10 }) {
    this.index = obj.index || 1;
    this.length = obj.length || 10;
    // code...
  }
}
