export const initialState = {
  isLogin: true,
  page: 1,
  path: 'http://localhost:3000',
  selection: {
    content: '',
    start: 0,
    end: 0
  },
  username: 'admin',
  password: '123',
  emotion: {
    articles: [],
    siderNavData: [],
    totalCount: 1,
    page: 1,
    selectedKeys: [],
    showIndex: 0,
    headerNavData: {
      title: '情感标注',
      data: [
        { name: '情感分类', path: '/table/emotion/classify', key: '情感分类' },
        { name: '情感实体抽取', path: '/table/emotion/markEntity', key: '情感实体抽取' }
      ]
    },
    filter: 'all',
    spinning: true,
    focusChangeValue: false,
    propertys: [
      { label: '无', value: '' },
      { label: '观点对象', value: 'aim' },
      { label: '观点持有者', value: 'hol' },
      { label: '观点发布时间', value: 't' }
    ],
    tempPropertys: [
      { name: '无', symbol: '' },
      { name: '观点对象', symbol: 'aim' },
      { name: '观点持有者', symbol: 'hol' },
      { name: '观点发布时间', symbol: 't' }
    ],
    visible: false,
    start: 0,
    end: 0,
    radioValue: '',
    labels: ['无', '观点对象', '观点持有者', '观点发布时间'],
    colors: ['black', '#f50', '#389e0d', '#108ee9'],
    emotionTypes: [
      { name: '无', symbol: 'disabled' }
    ]
  },
  sepWordsPro: {
    articles: [],
    SiderNavData: [],
    totalCount: 1,
    page: 1,
    selectedKeys: [],
    showIndex: 0,
    headerNavData: {
      title: '分词及词性标注',
      data: [
        { name: '分词', path: '/table/sepWordsPro/sepWords', key: '分词' },
        { name: '词性标注', path: '/table/sepWordsPro/markPro', key: '词性标注' }
      ]
    },
    propertys: [],
    visible: false,
    radioValue: '',
    wordIndex: null,
    filter: 'all',
    spinning: true
  },
  markEntity: {
    articles: [],
    SiderNavData: [],
    totalCount: 1,
    page: 1,
    selectedKeys: [],
    showIndex: 0,
    headerNavData: {
      title: '实体标注',
      data: [
        { name: '实体标注', path: '/table/markEntity', key: '实体标注' }
      ]
    },
    propertys: [],
    visible: false,
    start: 0,
    end: 0,
    radioValue: '',
    labels: ['无', '人名', '地名', '组织机构名'],
    colors: ['black', '#f50', '#389e0d', '#108ee9'],
    filter: 'all',
    spinning: true
  },
  createTask: {
    name: '',
    instruction: '',
    type: '',
    labels: [],
    selectedLabelsId: null,
    docs: [],
    markUsers: [],
    selectedUsers: []
  },
  createLabels: {
    type: '',
    labels: [],
    labelsValue: [],
    name: '',
    contentTypeLabels: [],
    uploadShow: false
  },
  createLabel: {
    type: '',
    name: '',
    symbol: ''
  },
  labelAndLabels: {
    label: {
      data: [],
      type: 'separateWordsProperty',
      page: 1
    },
    labels: {
      data: [],
      type: 'separateWordsProperty',
      page: 1
    }
  },
  tasks: {
    data: [],
    type: ''
  },
  taskId: 44, //设一个默认值，方便调试，实际设为null
  user: {
    id: 1,  //设一个默认值，方便调试，实际设为null
    name: ''
  },
  users: {
    data: []
  },
  createUser: {
    username: '',
    password: '',
    selectAuthIds: [],
    auths: []
  },
  home: {
    collapsed: false
  }
};