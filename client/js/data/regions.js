const regions = [
	{
		name: "中国大陆",
		children: [
			{
				name: "北京"
			},
			{
				name: "天津"
			},			
			{
				name: "上海"
			},
			{
				name: "广州"
			},
			{
				name: "深圳"
			},
			{
				name: "重庆"
			},
			{
				name: "河北",
				children: [{
				    name: "石家庄"
				}, {
				    name: "唐山"
				}, {
				    name: "保定"
				}, {
				    name: "邯郸"
				}, {
				    name: "廊坊"
				}, {
				    name: "秦皇岛"
				}, {
				    name: "沧州"
				}, {
				    name: "邢台"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "山西",
				children: [{
				    name: "太原"
				}, {
				    name: "大同"
				}, {
				    name: "运城"
				}, {
				    name: "忻州"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "内蒙古",
				children: [{
				    name: "呼和浩特"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "江苏",
				children: [{
				    name: "南京"
				}, {
				    name: "苏州"
				}, {
				    name: "无锡"
				}, {
				    name: "南通"
				}, {
				    name: "扬州"
				}, {
				    name: "镇江"
				}, {
				    name: "常州"
				}, {
				    name: "盐城"
				}, {
				    name: "泰州"
				}, {
				    name: "徐州"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "浙江",
				children: [{
				    name: "杭州"
				}, {
				    name: "温州"
				}, {
				    name: "宁波"
				}, {
				    name: "嘉兴"
				}, {
				    name: "台州"
				}, {
				    name: "绍兴"
				}, {
				    name: "湖州"
				}, {
				    name: "丽水"
				}, {
				    name: "金华"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "山东",
				children: [{
				    name: "济南"
				}, {
				    name: "青岛"
				}, {
				    name: "济宁"
				}, {
				    name: "聊城"
				}, {
				    name: "烟台"
				}, {
				    name: "淄博"
				}, {
				    name: "德州"
				}, {
				    name: "潍坊"
				}, {
				    name: "临沂"
				}, {
				    name: "威海"
				}, {
				    name: "东营"
				}, {
				    name: "枣庄"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "福建",
				children: [{
				    name: "福州"
				}, {
				    name: "厦门"
				}, {
				    name: "泉州"
				}, {
				    name: "漳州"
				}, {
				    name: "龙岩"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "安徽",
				children: [{
				    name: "合肥"
				}, {
				    name: "芜湖"
				}, {
				    name: "淮南"
				}, {
				    name: "巢湖"
				}, {
				    name: "阜阳"
				}, {
				    name: "宿州"
				}, {
				    name: "黄山"
				}, {
				    name: "安庆"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "江西",
				children: [{
				    name: "南昌"
				}, {
				    name: "九江"
				}, {
				    name: "宜春"
				}, {
				    name: "赣州"
				}, {
				    name: "萍乡"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "湖北",
				children: [{
				    name: "武汉"
				}, {
				    name: "十堰"
				}, {
				    name: "黄冈"
				}, {
				    name: "襄阳"
				}, {
				    name: "宜昌"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "湖南",
				children: [{
				    name: "长沙"
				}, {
				    name: "衡阳"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "河南",
				children: [{
				    name: "郑州"
				}, {
				    name: "洛阳"
				}, {
				    name: "驻马店"
				}, {
				    name: "许昌"
				}, {
				    name: "平顶山"
				}, {
				    name: "三门峡"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "广东",
				children: [{
				    name: "广州"
				}, {
				    name: "深圳"
				}, {
				    name: "东莞"
				}, {
				    name: "佛山"
				}, {
				    name: "珠海"
				}, {
				    name: "中山"
				}, {
				    name: "惠州"
				}, {
				    name: "江门"
				}, {
				    name: "汕头"
				}, {
				    name: "韶关"
				}, {
				    name: "湛江"
				}, {
				    name: "茂名"
				}, {
				    name: "肇庆"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "广西壮族自治区",
				children: [{
				    name: "南宁"
				}, {
				    name: "玉林"
				}, {
				    name: "柳州"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "海南",
				children: [{
				    name: "海口"
				}, {
				    name: "三亚"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "辽宁",
				children: [{
				    name: "沈阳"
				}, {
				    name: "大连"
				}, {
				    name: "丹东"
				}, {
				    name: "鞍山"
				}, {
				    name: "抚顺"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "黑龙江",
				children: [{
				    name: "哈尔滨"
				}, {
				    name: "大庆"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "吉林",
				children: [{
				    name: "长春"
				}, {
				    name: "吉林"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "陕西",
				children: [{
				    name: "西安"
				}, {
				    name: "宝鸡"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "新疆维吾尔族自治区",
				children: [{
				    name: "乌鲁木齐"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "甘肃",
				children: [{
				    name: "兰州"
				}, {
				    name: "其它城市"
				}]

			},
			{
				name: "宁夏回族自治区",
				children: [{
				    name: "银川"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "青海",
				children: [{
				    name: "西宁"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "四川",
				children: [{
				    name: "成都"
				}, {
				    name: "德阳"
				}, {
				    name: "广元"
				}, {
				    name: "绵阳"
				}, {
				    name: "内江"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "云南",
				children: [{
				    name: "昆明"
				}, {
				    name: "曲靖"
				}, {
				    name: "玉溪"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "贵州",
				children: [{
				    name: "贵阳"
				}, {
				    name: "其它城市"
				}]
			},
			{
				name: "西藏自治区",
				children: [{
				    name: "拉萨"
				}, {
				    name: "其它城市"
				}]
			}
		]
	},
	{
		name: "香港特别行政区"
	},
	{
		name: "澳门特别行政区"
	},
	{
		name: "中国台湾"
	},
	{
		name: "亚洲其它国家"
	},
	{
		name: "欧洲"
	},
	{
		name: "美洲"
	},
	{
		name: "非洲"
	},
	{
		name: "其它国家"
	}
];

export default regions;
				

				

				

				

				

				

				

				
				

				

				

				

				

				
