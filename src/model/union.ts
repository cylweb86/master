export interface Union {
    /**
        补充内容列表数组
        "additionals": [{
        "contents": "我是补充的内容",
        "createTime": "2018-07-27 10:45",
        "title": "补充1"
        }]
     */
    additionals: any[];
    /**
        审批列表
        "approvals": [{
        "createTime": "2018-07-26 16:31",
        "isPass": 0, //审批结果 （0：未审批；1：通过；2：不通过）
        "appLv": 3,//审批人级别
        "isPassName": "未审核", // 审批结果名称
        "creatorName": "",//审批者姓名
        "role": ""  //审批者职务、角色
        }]
     */
    approvals: any[];
    /**
     * 回复列表数组
     */
    replies: any[];
    area: string;
    // 考试渠道
    channel: number;
    /**
     * 收费标准
     */
    chargeStd: string;
    /**
         是否收费：
         0:免费;1:收费;2:协议年费
     */
    chargeType: number;
    contact: string;
    contactWay: string;
    createTime: string;
    //创建人的电话号码
    creator: string;
    //创建人的名字
    creatorName: string;
    //创建人职务、角色
    role: string;
    examName: string;
    examTimeEnd: string;
    examTimeStart: string;
    /**
        考试类型：
        1:原组织代码考试;2:新建申请
     */
    examType: number;
    guid: string;
    // 工单编号
    id: number;
    //是否可以补充内容
    isCanAdditional: boolean;
    //是否可以审批
    isCanApproval: boolean;
    isCanReply: boolean;
    //是否可以撤回
    isCanRevoke: boolean;
    //组织代码
    orgCode: string;
    //平台名称
    platform: string;
    schoolNum: number;
    studentNum: number;
    //联考工单审批状态名称
    staName: string;
    /**
     联考工单审批状态：
     1:待审批;2:同意;3:不同意;4:撤回
     */
    status: number;
    /**
        是否申请技术支持：
        0:不申请;1:申请技术支持;2:申请技术协作
     */
    techSupt: number;
    //技术支持原因及业务详情
    techSuptDesc: string;
    //年级
    grade: number | string;
    /**
     * 是否可以申请发布 0：不显示，1：考试时间未结束，2：可以申请，3：已经申请，4：已经发布
     * 0 表示不显示那个按钮 未审核就不会有这个状态
     */
    isCanRelease: number;
}
