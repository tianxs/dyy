import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Staffs, Users, Products} from './data/user';

let _Users = Users;
let _Staffs = Staffs;
let _Products = Products;

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    // 登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, {code: 200, msg: '请求成功', user}]);
          } else {
            resolve([200, {code: 500, msg: '账号或密码错误'}]);
          }
        }, 1000);
      });
    });
    // 获取员工列表
    mock.onGet('/user/updateUser').reply(config => {
      let {userName, employeeNumber, department, roleName, phoneNumber} = config.params;
      let mockUsers = _Staffs.filter(user => {
        if (userName && user.userName.indexOf(userName) == -1) return false;
        if (employeeNumber && user.employeeNumber.indexOf(employeeNumber) == -1) return false;
        if (department && user.department.indexOf(department) == -1) return false;
        if (roleName && user.roleName.indexOf(roleName) == -1) return false;
        if (phoneNumber && user.phoneNumber.indexOf(phoneNumber) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });
    // 新增员工
    mock.onGet('/user/saveUser').reply(config => {
      let {employeeNumber, userName, department, job, roleIds} = config.params;
      _Staffs.push({
        employeeNumber: employeeNumber,
        department: department,
        userName: userName,
        job: job,
        roleIds: roleIds
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });
    // 重置密码
    mock.onGet('/user/resetPassword').reply(config => {
      // let { id } = config.params;
      // _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '重置成功'
          }]);
        }, 500);
      });
    });
    // 获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    // 获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });
    // 获取产品列表（分页）
    mock.onGet('v2/productInfo/getProductInfoList').reply(config => {
      let {type, name} = config.params;
      let mockProducts = _Products.filter(products => {
        if (name && products.name.indexOf(name) === -1) return false;
        return true;
      });
      mockProducts = mockProducts.filter((products, index) => {
        if (type && products.type.indexOf(type) === -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: mockProducts
          }]);
        }, 1000);
      });
    });

    // 删除用户
    mock.onGet('/user/remove').reply(config => {
      let {id} = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    // 批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let {ids} = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    // 编辑用户
    mock.onGet('/user/edit').reply(config => {
      let {id, name, addr, age, birth, sex} = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    // 新增用户
    mock.onGet('/user/add').reply(config => {
      let {name, addr, age, birth, sex} = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
}
