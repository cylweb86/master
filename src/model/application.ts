export interface Application {
  /**
   *最新版本
   */
  version: string;

  /**
   *更新模式
   */
  strict: boolean;

  /**
   *更新内容
   */
  memo: string;

  /**
   *更新地址
   */
  url: string;
}
