// 检测手机号码

const checkPhone = (str) => {
	return /^1(3[0-9]|5[0-9]|7[0678]|8[0-9]|4[57])\d{8}$/g.test(str);
}

module.exports = checkPhone