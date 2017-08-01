// 变量
var sectionOneData = sectionTwoData = sectionThreeData = sectionFourData = sectionFiveData = sectionSixData = {}
var BASE_URL = 'http://192.168.188.134:8086/activity/v1/api/BigDataMonitoringSystemController/';

$(function() {
	// 调用
	chartOne.init();
	chartThree.init();
	chartFour.init();
	chartFive.init();
	chartSix.init();
	timer.init();

	// 循环
	setInterval(function() {
		chartOne.init();
		chartThree.init();
		chartFour.init();
		chartFive.init();
		chartSix.init();
		timer.init();
	}, 1000 * 60);
});
//chart init
var chartOne = {
	init: function() {
		$.ajax({
			type: "post",
			url: BASE_URL + 'findBigDateInvestShow',
			dataType: 'json',
			success: function(data) {
				if(data.code == 200) {
					chartOne.drawChart(data.model.bigDateInvestShow);
				}
			}
		});
	},
	drawChart: function(data) {
		// 拼接数据
		var cityNameList = [];
		var cityAmt = [];
		for(var i = 0; i < data.length; i++) {
			cityNameList.unshift(data[i].pname);
			cityAmt.unshift(data[i].amt);
		}
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('bigDateInvestChart'));

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['', ]
			},
			label: {
				normal: {
					show: true,
					position: 'right',
					offset: [0, 0],
					textStyle: {
						color: '#51FFFF',
					}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				splitLine: {
					show: false,
					lineStyle: {
						color: ['#51ffff']
					}
				},
				axisLine: {
					lineStyle: {
						color: '#51ffff',
						width: 1,
					}
				},
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				name: '单位:万元',
				splitLine: {
					lineStyle: {
						color: ['#51ffff']
					}
				},
				axisLine: {
					lineStyle: {
						color: '#51ffff',
						width: 1,
					}
				},
				type: 'category',
				data: cityNameList
			},
			series: [{
				name: '2011年',
				type: 'bar',
				barWidth: "50%",
				itemStyle: {
					normal: {
						color: function(params) {
							var colorList = ['#f8b551', '#f39800', '#ee754b', '#eb6100', '#e60012'];
							return colorList[params.dataIndex];
						}
					},
				},
				data: cityAmt
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

	}
}
var chartThree = {
	init: function() {
		$.ajax({
			type: "post",
			url: BASE_URL + 'findAgeHaveMoneyGrade',
			dataType: 'json',
			success: function(data) {
				if(data.code == 200) {
					chartThree.drawChart(data.model.ageHaveMoneyGrade);
				}
			}
		});
	},
	drawChart: function(data) {
		// 处理data
		var totalData = [];
		var tempData = data;
		for(var i = 0; i < data.length; i++) {
			totalData.push({
				value: data[i].amt,
				name: data[i].age,
			});
		}
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('ageChart'));

		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			color: ['#ec6941', '#fc3b00', '#f39800', '#0dc59f', '#ffe26d', '#00b7ee'],
			series: [{
				name: '',
				type: 'pie',
				radius: ['30%', '60%'],
				label: {
					normal: {
						formatter: '{b}\n{c}万\n({d}%)'
					}
				},
				data: totalData
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
}
var chartFour = {
	init: function() {
		$.ajax({
			type: "post",
			url: BASE_URL + 'findRegisterAndInvestInfo',
			dataType: 'json',
			success: function(data) {
				if(data.code == 200) {
					chartFour.drawChart(data.model.registerAndInvestInfo);
				}
			}
		});
	},
	drawChart: function(data) {
		// 处理数据
		var todayAmt = [];
		var totalAmt = [];
		var androidCount = 0;
		var iOSCount = 0;
		var pcCount = 0;

		for(var i = 0; i < data.length; i++) {
			todayAmt.push(data[i].dramt.toFixed(0) - 0); //当日投资金额
			totalAmt.push(data[i].amt.toFixed(0) - 0); //总计投资金额
			if(data[i].dev == 'Android') {
				androidCount = '安卓' + " " + data[i].zccn;
			} else if(data[i].dev == 'iOS') {
				iOSCount = 'iOS' + data[i].zccn;
			} else if(data[i].dev == 'PC') {
				pcCount = 'PC' + " " + data[i].zccn;
			}
		}
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('equmentTypeChart'));

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			label: {
				normal: {
					show: true,
					position: 'top',
					offset: [0, 0],
					textStyle: {
						color: '#51FFFF',
					}
				}
			},
			xAxis: [{
				type: 'category',
				axisLabel: {
					interval: 0,
					formatter: function(value) {
						var ret = "";
						var maxLength = 3;
						var valLength = value.length;
						var rowN = 2;
						if(rowN > 1) {
							for(var i = 0; i < rowN; i++) {
								var temp = "";
								var start = i * maxLength;
								if(i == 0) {
									var end = start + maxLength;
								} else {
									var end = start + valLength;
								}
								temp = value.substring(start, end) + "\n";
								ret += temp;
							}
							return ret;
						} else {
							return value;
						}
					}
				},
				data: [{
					value: androidCount,
					textStyle: {
						color: '#f39800'
					}
				}, {
					value: iOSCount,
					textStyle: {
						color: '#e60012'
					}
				}, {
					value: pcCount,
					textStyle: {
						color: '#ee754b'
					}
				}],
				axisLine: {
					lineStyle: {
						color: '#51ffff',
						width: 1,
					}
				},
				axisPointer: {
					type: 'shadow'
				}
			}],
			yAxis: [{
				type: 'value',
				name: '单位:万元',
				min: 0,
				splitLine: {
					lineStyle: {
						color: ['#51ffff']
					}
				},
				axisLine: {
					lineStyle: {
						color: '#51ffff',
						width: 1,
					}
				},
				axisLabel: {
					formatter: '{value}'
				}
			}],
			series: [{
					name: 'Today',
					type: 'bar',
					tooltip: {
						position: [10, 10],
						formatter: '{b0}: {c0}<br />{b1}: {c1}'
					},
					barWidth: "20%",
					//配置样式
					itemStyle: {
						normal: {
							color: function(params) {
								var colorList = ['#f39800', '#e60012', '#ee754b'];
								return colorList[params.dataIndex];
							}
						},
					},
					data: todayAmt
				},
				{
					name: 'Total',
					type: 'bar',
					barWidth: "20%",
					itemStyle: {
						normal: {
							color: function(params) {
								var color = '#52ffff';
								return color;
							}
						},
					},
					data: totalAmt
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
}
var chartFive = {
	init: function() {
		$.ajax({
			type: "post",
			url: BASE_URL + 'findProductBuyInfo',
			dataType: 'json',
			success: function(data) {
				if(data.code == 200) {
					chartFive.setData(data.model.productBuyInfo);
				}
			}
		});
	},
	setData: function(data) {
		chartFive.initChart(data);
	},
	initChart: function(data) {
		// 拼接数据
		var chartData = [];
		var colorList = [];
		for(var i = 0; i < data.length; i++) {
			chartData.push({
				value: data[i].amt,
				name: data[i].proname,
			});
			colorList.push(randomColor());
		}
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('sectionFive'));

		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '',
				type: 'pie',
				radius: '96%',
				center: ['50%', '50%'],
				labelLine: {
					normal: {
						show: false
					}
				},
				label: {
					normal: {
						show: false
					}
				},
				data: chartData,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				},
				color: colorList,
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		// 渲染Table
		chartFive.initTable(data, colorList);
	},
	initTable: function(data, colorList) {
		var tbodyHTML = "";
		var tbodyObj = $("#sectionFiveTable tbody");
		tbodyObj.empty();
		for(var i = 0; i < data.length; i++) {
			tbodyHTML += "<tr>" +
				"<td>" +
				"<i class='order' style='background:" + colorList[i] + "'></i>" + data[i].proname +
				"</td>" +
				"<td>" + data[i].cn + "</td>" +
				"<td>" + data[i].amt + "</td>" +
				"</tr>";
		}
		tbodyObj.append(tbodyHTML);
	}
}
var chartSix = {
	init: function() {
		$.ajax({
			type: "post",
			url: BASE_URL + 'findUserBuyInfo',
			dataType: 'json',
			success: function(data) {
				if(data.code == 200) {
					chartSix.drawChart(data.model.userBuyInfo);
				}
			}
		});
	},
	drawChart: function(data) {
		// 设置时间
		var reverseData = data.reverse();
		var timeData = [];
		var amtData = []; //投资金额
		var cnData = []; //投资人数
		var bkData = []; //绑卡人数
		var zcData = []; //注册人数
		var smData = []; //实名人数

		for(var i = 0; i < reverseData.length; i++) {
			timeData.push(data[i].h + ":" + (reverseData[i].m * 5 < 10 ? "0" + reverseData[i].m * 5 : reverseData[i].m * 5)); //时间
			amtData.push(reverseData[i].amt);
			cnData.push(reverseData[i].cn);
			bkData.push(reverseData[i].bkcn);
			zcData.push(reverseData[i].zccn);
			smData.push(reverseData[i].smcn);
		}
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('userInvestmentChart'));

		option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				}
			},
			radius: ['50%', '80%'],
			legend: {
				data: ['投资金额', '投资数', '绑卡数', '注册数', '实名数'],
				textStyle: { //图例文字的样式
					color: '#51ffff',
					fontSize: 12
				}
			},
			color: ['#448aca', '#fff45c', '#feafff', '#ffd2ae', '#ff4b40'],
			xAxis: [{
				type: 'category',
				data: timeData, //时间轴
				axisLine: {
					lineStyle: {
						color: '#51ffff',
						width: 1,
					}
				},
				axisLabel: {
					interval: 0,
					rotate: 40
				},
				axisPointer: {
					type: 'shadow'
				}
			}],
			yAxis: [{
					type: 'value',
					name: '单位:万元',
					min: 0,
					axisLine: {
						lineStyle: {
							color: '#51ffff',
							width: 1,
						}
					},
					splitLine: {
						lineStyle: {
							color: ['#51ffff']
						}
					},
					axisLabel: {
						formatter: '{value}万元'
					}
				},
				{
					type: 'value',
					name: '单位:人次',
					min: 0,
					axisLine: {
						lineStyle: {
							color: '#51ffff',
							width: 1,
						}
					},
					splitLine: {
						lineStyle: {
							color: ['#51ffff']
						}
					},
					axisLabel: {
						formatter: '{value}'
					}
				}
			],
			series: [{
					name: '投资金额',
					type: 'bar',
					barWidth: "40%",
					data: amtData
				},
				{
					name: '投资数',
					type: 'line',
					yAxisIndex: 1,
					data: cnData
				},
				{
					name: '绑卡数',
					type: 'line',
					yAxisIndex: 1,
					data: bkData
				}, {
					name: '注册数',
					type: 'line',
					yAxisIndex: 1,
					data: zcData
				}, {
					name: '实名数',
					type: 'line',
					yAxisIndex: 1,
					data: smData
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
}

var timer = {
	init: function() {
		timer.getTime();
		setInterval(function() {
			timer.getTime();
		}, 1000 * 60);
	},
	getTime: function() {
		// get time
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		var day = time.getDate();
		var hourNumber = time.getHours();
		var hourString = hourNumber < 10 ? "0" + hourNumber.toString() : hourNumber.toString();
		var minNumber = time.getMinutes();
		var minString = minNumber < 10 ? "0" + minNumber.toString() : minNumber.toString();
		var hour1 = hourString.substring(0, 1);
		var hour2 = hourString.substring(1, 2);
		var min1 = minString.substring(0, 1);
		var min2 = minString.substring(1, 2);

		var fullMin = "<div>" +
			"<i>" + hour1 + "</i>" +
			"<i>" + hour2 + "</i>" +
			"<i class='slice'>:</i>" +
			"<i>" + min1 + "</i>" +
			"<i>" + min2 + "</i>" +
			"</div>";
		var timer = $(".section-three>.timer");
		timer.empty();
		timer.append("<span>" + year + "年" + month + "月" + day + "日" + "</span>");
		timer.append(fullMin);
	}
}
// 颜色随机
function randomColor() {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}