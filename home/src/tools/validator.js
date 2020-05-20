import { MessageBox } from 'mint-ui';

export function checkToken(path) {
    let token = localStorage.getItem('token');
    if(!token) {
        // 提示内容
        MessageBox.confirm('', {
            message: '登录后才能回答问题哦，老铁',
            title: '温馨提示',
            confirmButtonText: '去登陆'
        })
        // 确定按钮
        .then(() => {
            // 跳转到登录页面
            // this.$router.push('/login')
            path;
        })
        // 取消按钮
        .catch(() => {
            console.log('已关闭')
        })
    }
}
// 计算输入的字符长度
export const calRealLength = function (str) {

    if (!str) return
  
    let reallength = 0
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) {
        reallength += 1
      } else {
        reallength += 2
      }
    }
    return reallength
  
}
// 向 localstorage 中存入数据  仅支持存字符串与对象格式
export const setLocalStorage = function (key, val, type) {
  if (!type) return
  if (type === 'string') {
    localStorage.setItem(key, val)
  }
  if (type === 'object') {
    localStorage.setItem(key, JSON.stringify(val))
  }

}

// 向 localstorage 中取数据
export const getLocalStorage = function (key, type) {
  if (!type) return
  if (type === 'string') {
    return localStorage.getItem(key)
  }
  if (type === 'object') {
    return JSON.parse(localStorage.getItem(key))
  }

}

export const dateFilter = function (time, format = 'YY-MM-DD hh:mm:ss') {
  let date = new Date(time);

  let year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index;
  }); ////开个长度为10的数组 格式为 00 01 02 03

  let newTime = format.replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);

  return newTime;
}
