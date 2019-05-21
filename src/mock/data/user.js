import Mock from 'mockjs';

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];
// 模拟员工列表数据
const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
// 模拟员工列表数据
const Staffs = [];

for (let i = 0; i < 8; i++) {
  Staffs.push(Mock.mock({
    id: Mock.Random.guid(),
    employeeNumber: Mock.Random.zip(),
    userName: Mock.Random.cname(),
    roleIds: Mock.Random.pick(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
    roleName: Mock.Random.pick(['开发者', '游客', '管理员']),
    department: Mock.Random.pick(['开发部', '事业部', '后勤部', '项目部']),
    job: Mock.Random.csentence(5),
    phoneNumber: /^1[0-9]{10}$/

  }));
}
// 模拟产品列表数据
const Products = [];

for (let i = 0; i < 50; i++) {
  Products.push(Mock.mock({
    id: Mock.Random.increment(),
    type: Mock.Random.pick(['1', '2', '3']),
    pictureUrl: Mock.Random.dataImage('100x100', '产品图片'),
    name: Mock.Random.pick(['私募证券产品-', '权益类-', '类固收类-']) + Mock.Random.ctitle(5, 30),
    code: Mock.Random.id(),
    raiseAmountMax: Mock.Random.integer(500, 1000),
    signAmount: Mock.Random.integer(100, 500),
    statusName: Mock.Random.pick(['预热中', '认购中', '认购暂停', '产品清算中'])
  }));
}
export {LoginUsers, Users, Staffs, Products};
