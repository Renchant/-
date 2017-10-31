`小程序`

> * 1.setData

> * 2.导航api wx.navigateTo()
	* 为了不让用户在使用小程序时造成困扰，我们规定页面路径只能是五层，请尽量避免多层级的交互方式。
	* 要跳转的页面配置了tabbar，不生效，只能使用 switchTab

> * 3.动态类名支持三元式判断及渲染动态
class="type-item {{ categoryIndex === index ? 'type-item-on' : '' }}"

> * 4.exports 与 module.exports
	1.module.exports 初始值为一个空对象 {}
	2.exports 是指向的 module.exports 的引用
	3.require() 返回的是 module.exports 而不是 exports

	因此exports被覆盖，并不会改变module.exports的值，还是{}，而require返回的是module.exports 而不是 exports

	`exports 是 module.exports 的一个引用，因此在模块里边随意更改 exports 的指向会造成未知的错误。所以我们更推荐开发者采用 module.exports 来暴露模块接口，除非你已经清晰知道这两者的关系`

```js
	var a = {name: '张三'};
    var b = a;
    console.log(a); //{ name: '张三' }
    console.log(b); // { name: '张三' }

    b.name = '李四';
    console.log(a);  //{ name: '李四' } 
    console.log(b);	//{ name: '李四' }

    var b = {name: '王五'};
    console.log(a);  //{ name: '李四' }
    console.log(b);	//{ name: '王五' }
```
 	`a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一个对象，即 a 和 b 指向同一块内存地址，所以前两个输出一样`
 	`因为小程序require() 返回的是module.exports 而不是exports`

```js
	var name = '张三';
	exports.name = name;
	exports.sayName = function() {
	  console.log(name);
	}
	上面的代码相当于：
	var name = '张三';
	module.exports.name = name;
	module.exports.sayName = function() {
	   console.log(name);
	}
```

> * 5.css文件background不支持本地图片路径
	`do-not-use-local-path`
	`网络图片可以么` ： 可以
	`内联本地图片可以么` : 可以
	`base64可以么`：可以

> * 6.imgae不能被require或者import，不过本地路径可以动态

> * 7.this

> * 8.通讯
	`全局通讯` getApp();(生命周期函数都能拿到)
	`跨页面通讯` vuex ? 不存在的

	总的思路提供三种： 
	1.一般人思路例如我：用标志位，就是各种true/false(然后把改变了的参数和标志一起写入全局App对象或者localStorage) ，然后每次页面onShow时更改状态
	缺点：这种处理在业务逻辑比较简单、页面间的交叉度很小时还能凑合，一旦逻辑复杂起来，就需要写很多冗余的代码，并且维护成本会非常高

	2.找文档 小程序有提供一个页面栈的东西 getCurrentPages 得到当前页面栈的实例,再根据`页面进栈的顺序`我们就能拿到栈内各页面的 Page 对象
	这就非常坑了，如果是分享或者重定向进来的页面，对不起，拿不到其他页面的实例

	3.自己做个eventbus ？ => 发布／订阅模式
	由一个发布者、多个订阅者以及一个调度中心所组
	

