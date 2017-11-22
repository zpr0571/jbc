(function($) {
	$.fn.citySelect = function(settings) {
		if(this.length < 1) {
			return;
		};

		// 城市网点数据
		settings = $.extend({
			url: {
				"citylist": [{
					"p": "常州市分行",
					"c": [{
						"n": "钟楼支行",
						"a": [{
							"s": "会馆浜分理处"
						}, {
							"s": "浦南分理处"
						}, {
							"s": "西环路分理处"
						}, ]
					}, {
						"n": "天宁支行",
						"a": [{
							"s": "人民新家园分理处"
						}, {
							"s": "嘉宏盛世支行"
						}, {
							"s": "光华路分理处"
						}, ]
					}, {
						"n": "营业部",
						"a": [{
							"s": "1.1网点"
						}, {
							"s": "1.2网点"
						}, {
							"s": "1.3网点"
						}, ]
					}, {
						"n": "经济开发区支行",
						"a": [{
							"s": "荷花苑分理处"
						}, {
							"s": "1.2网点"
						}, {
							"s": "1.3网点"
						}, ]
					}]
				}, {
					"p": "淮安市分行",
					"c": [{
						"n": "楚州支行",
						"a": [{
							"s": "2.1网点"
						}, {
							"s": "2.2网点"
						}, {
							"s": "2.3网点"
						}, ]
					}, {
						"n": "洪泽支行",
						"a": [{
							"s": "1.1网点"
						}, {
							"s": "1.2网点"
						}, {
							"s": "1.3网点"
						}, ]
					}, {
						"n": "金湖支行",
						"a": [{
							"s": "1.1网点"
						}, {
							"s": "1.2网点"
						}, {
							"s": "1.3网点"
						}, ]
					}, {
						"n": "涟水支行",
						"a": [{
							"s": "炎黄大道网点"
						}, {
							"s": "开发区网点"
						}, {
							"s": "1.3网点"
						}, ]
					}]
				}, {
					"p": "常州",
					"c": [{
						"n": "3支行"
					}, {
						"n": "3.1支行"
					}, {
						"n": "3.2支行"
					}, {
						"n": "3.3支行"
					}]
				}, {
					"p": "扬州",
					"c": [{
						"n": "4支行"
					}, {
						"n": "4.1支行"
					}, {
						"n": "4.2支行"
					}, {
						"n": "4.3支行"
					}]
				}, ]
			},
			prov: null,
			city: null,
			dist: null,
			nodata: null,
			required: true
		}, settings);
    
    // 与页面产生联系
		var box_obj = this;
		var prov_obj = box_obj.find(".prov");
		var city_obj = box_obj.find(".city");
		var dist_obj = box_obj.find(".dist");
		var prov_val = settings.prov;
		var city_val = settings.city;
		var dist_val = settings.dist;
		var select_prehtml = (settings.required) ? "" : "<option>请选择需要查询的分行</option>";
		var city_json;

		// 支行开始
		var cityStart = function() {
			var prov_id = prov_obj.get(0).selectedIndex;
			if(!settings.required) {
				prov_id--;
			};
			city_obj.empty().attr("disabled", true);
			dist_obj.empty().attr("disabled", true);

      // 省份选择不对，子列表无法显示
			if(prov_id < 0 || typeof(city_json.citylist[prov_id].c) == "undefined") {
				if(settings.nodata == "none") {
					city_obj.css("display", "none");
					dist_obj.css("display", "none");
				} else if(settings.nodata == "hidden") {
					city_obj.css("visibility", "hidden");
					dist_obj.css("visibility", "hidden");
				};
				return;
			};

			// 
			temp_html = select_prehtml;
			$.each(city_json.citylist[prov_id].c, function(i, city) {
				temp_html += "<option value='" + city.n + "'>" + city.n + "</option>";
			});
			city_obj.html(temp_html).attr("disabled", false).css({
				"display": "",
				"visibility": ""
			});
			distStart();
		};

		// 网点开始
		var distStart = function() {
			var prov_id = prov_obj.get(0).selectedIndex;
			var city_id = city_obj.get(0).selectedIndex;
			if(!settings.required) {
				prov_id--;
				city_id--;
			};
			dist_obj.empty().attr("disabled", true);

			if(prov_id < 0 || city_id < 0 || typeof(city_json.citylist[prov_id].c[city_id].a) == "undefined") {
				if(settings.nodata == "none") {
					dist_obj.css("display", "none");
				} else if(settings.nodata == "hidden") {
					dist_obj.css("visibility", "hidden");
				};
				return;
			};

			// 
			temp_html = select_prehtml;
			$.each(city_json.citylist[prov_id].c[city_id].a, function(i, dist) {
				temp_html += "<option value='" + dist.s + "'>" + dist.s + "</option>";
			});
			dist_obj.html(temp_html).attr("disabled", false).css({
				"display": "",
				"visibility": ""
			});
		};

		var init = function() {
			// 
			temp_html = select_prehtml;
			$.each(city_json.citylist, function(i, prov) {
				temp_html += "<option value='" + prov.p + "'>" + prov.p + "</option>";
			});
			prov_obj.html(temp_html);

			// 
			setTimeout(function() {
				if(settings.prov != null) {
					prov_obj.val(settings.prov);
					cityStart();
					setTimeout(function() {
						if(settings.city != null) {
							city_obj.val(settings.city);
							distStart();
							setTimeout(function() {
								if(settings.dist != null) {
									dist_obj.val(settings.dist);
								};
							}, 1);
						};
					}, 1);
				};
			}, 1);

			// 
			prov_obj.bind("change", function() {
				cityStart();
			});

			// 
			city_obj.bind("change", function() {
				distStart();
			});
		};

		// 
		if(typeof(settings.url) == "string") {
			$.getJSON(settings.url, function(json) {
				city_json = json;
				init();
			});
		} else {
			city_json = settings.url;
			init();
		};
	};
})(jQuery);