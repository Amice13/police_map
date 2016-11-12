/* Data codebook */

// addressPoints - Initial Data
// e - Event
// h - Hours
// d - Weekday
// m - Month


// Inititalize map

var map = L.map('map').setView([50.4562798,30.5742069], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var heatmap = L.heatLayer([{lat:0,lon:0}],{blur:10,radius:5, minOpacity:1, maxZoom:10}).addTo(map);

var labels = ["АДМІНІСТРАТИВНЕ КОРУПЦІЙНЕ ПРАВОПОРУШЕННЯ", "БАНДИТИЗМ", "БЕЗВІСТНО ВІДСУТНІЙ", "ВБИВСТВО", "(ВИКЛЮЧЕНО) АНОНІМНЕ ПОВІДОМЛЕННЯ", "(ВИКЛЮЧЕНО) ІНШЕ КРИМІНАЛЬНЕ ПРАВОПОРУШЕННЯ", "ВИКОРИСТАННЯ КОШТІВ ВІД ОБІГУ НАРКОТИКІВ", "ВИКРАДЕННЯ ЗБРОЇ, БОЄПРИПАСІВ І ВИБУХІВКИ", "ВИМАГАННЯ", "ВИЯВЛЕННЯ Б/П, ЗБРОЇ", "ВИЯВЛЕННЯ НЕВІДОМОЇ ДИТИНИ", "ВИЯВЛЕННЯ НЕОПІЗНАНОГО ТРУПА", "ВИЯВЛЕННЯ ОПІЗНАНОГО ТРУПА", "ВИЯВЛЕННЯ РТУТІ", "ВТЕЧА", "ВТРАТА ДОКУМЕНТІВ,ПЕЧАТОК", "ВТРАТА ЗБРОЇ", "ВТРАТА РЕЧІ", "ВТЯГН.Н/Л У ЗЛОЧ.ДІЯЛ.", "ГРАБІЖ", "ДЕЗЕРТИРСТВО", "ДОБРОВІЛЬНА ЗДАЧА ЗБРОЇ АБО БОЄПРИПАСІВ, НАЛЕЖНИХ ЗАЯВНИКОВІ", "ДОБРОВІЛЬНА ЗДАЧА ЗБРОЇ АБО БОЄПРИПАСІВ, НЕ НАЛЕЖНИХ ЗАЯВНИКОВІ", "ДРІБНЕ ВИКРАДАННЯ ЧУЖОГО МАЙНА", "ДРІБНЕ ХУЛІГАНСТВО", "ДТП БЕЗ ТРАВМОВАНИХ", "ЗАВОЛОДІННЯ АВТОТРАНСПОРТОМ", "ЗАВОЛОДІННЯ ІНШИМ ТРАНСПОРНИМ ЗАСОБОМ", "ЗБЕРІГАННЯ НАРКОТИКІВ", "ЗБЕРІГАННЯ ОТРУЙНИХ РЕЧОВИН", "ЗБУТ НАРКОТИКІВ", "ЗГВАЛТУВАННЯ", "З'ЇЗД, ЗБОРИ", "ЗЛОВЖИВАННЯ ВЛАДОЮ", "ЗЛОЧИНИ ПРОТИ БЕЗПЕКИ ВИРОБНИЦТВА", "ЗЛОЧИНИ ПРОТИ ДОВКІЛЛЯ", "ЗЛОЧИНИ ПРОТИ МИРУ, БЕЗПЕКИ ЛЮДСТВА ТА МІЖНАРОДНОГО ПРАВОПОРЯДКУ", "ЗЛОЧИНИ ПРОТИ ОСНОВ НАЦІОНАЛЬНОЇ БЕЗПЕКИ УКРАЇНИ", "ЗЛОЧИНИ У СФЕРІ ВИКОРИСТАННЯ ЕОМ", "ЗНАЙДЕНІ (БЕЗХОЗНІ) РЕЧІ", "ІНША НАДЗВИЧАЙНА ПОДІЯ", "ІНША ПОДІЯ", "ІНШІ АДМІНІСТРАТИВНІ ПРАВОПОРУШЕННЯ", "ІНШІ ВІЙСЬКОВІ ЗЛОЧИНИ", "ІНШІ ГОСПОДАРЧІ ЗЛОЧИНИ", "ІНШІ ЗЛОЧИНИ ЗЛОЧИНИ ПРОТИ ВОЛІ, ЧЕСТІ ТА ГІДНОСТІ ОСОБИ", "ІНШІ ЗЛОЧИНИ ПРОТИ АВТОРИТЕТУ ОРГАНІВ ДЕРЖАВНОЇ ВЛАДИ, ОРГАНІВ МІСЦЕВОГО САМОВРЯ", "ІНШІ ЗЛОЧИНИ ПРОТИ БЕЗПЕКИ РУХУ ТА ЕКСПЛУАТАЦІЇ ТРАНСПОРТУ", "ІНШІ ЗЛОЧИНИ ПРОТИ ВИБОРЧИХ, ТРУДОВИХ ТА ІНШИХ ОСОБИСТИХ ПРАВ І СВОБОД ЛЮДИНИ І", "ІНШІ ЗЛОЧИНИ ПРОТИ ВЛАСНОСТІ", "ІНШІ ЗЛОЧИНИ ПРОТИ ГРОМАДСЬКОГО ПОРЯДКУ ТА МОРАЛЬНОСТІ", "ІНШІ ЗЛОЧИНИ ПРОТИ ГРОМАДСЬКОЇ БЕЗПЕКИ", "ІНШІ ЗЛОЧИНИ ПРОТИ ЖИТТЯ ТА ЗДОРОВ`Я ОСОБИ", "ІНШІ ЗЛОЧИНИ ПРОТИ ПРАВОСУДДЯ", "ІНШІ ЗЛОЧИНИ У СФЕРІ ОХОРОНИ ДЕРЖАВНОЇ ТАЄМНИЦІ, НЕДОТОРКАННОСТІ ДЕРЖАВНИХ КОРДО", "ІНШІ МАСОВІ ЗАХОДИ", "ІНШІ МАСОВІ КОНФЛІКТИ", "ІНШІ НАРКОЗЛОЧИНИ", "ІНШІ СЛУЖБОВІ ЗЛОЧИНИ", "ІНШІ ТІЛЕСНІ УШКОДЖЕННЯ", "КОНТРАБАНДА", "КРАДІЖКА", "НАРКОЛАБОРАТОРІЇ", "НЕЗАКОННЕ ПЕРЕПРАВЛЕННЯ ОСІБ ЧЕРЕЗ КОРДОН", "НЕЗАКОННЕ ПОВОДЖЕННЯ ЗІ ВОГНЕПАЛЬНОЮ ЗБРОЄЮ", "НЕЗАКОННЕ ПОВОДЖЕННЯ ЗІ ЗБРОЄЮ, БОЄПРИПАСАМИ І ВИБУХІВКОЮ", "НЕПРАВДИВЕ ПОВІДОМЛЕННЯ ПРО ВИБУХ, ПІДПАЛ, ІНШІ ЗАГРОЗИ ЖИТТЮ ЛЮДЕЙ", "НЕСАНКЦІОНОВАНИЙ МІТИНГ", "ОПІР ПРАЦІВНИКУ  МІЛІЦІЇ", "ПЕРЕВИЩЕННЯ ВЛАДИ", "ПЕРЕКРИТТЯ РУХУ", "ПИКЕТУВАННЯ", "ПІДПАЛ АВТОМОТОТРАНСПОРТУ", "ПІДРОБКА ГРОШЕЙ", "ПІДРОБЛЕННЯ ДОКУМЕНТІВ", "ПОБУТОВИЙ НЕЩАСНИЙ ВИПАДОК", "ПОВІДОМЛЕННЯ ЛІКАРЯ", "ПОЖЕЖА", "ПОРУШЕННЯ ВИБОРЧОГО ЗАКОНОДАВСТВА", "ПОРУШЕННЯ ПРАВИЛ АДМІННАГЛЯДУ", "ПОРУШЕННЯ ПРАВИЛ ДОРОЖНЬОГО РУХУ (ДТП З ТРАВМОВАНИМИ)", "ПРИВЛАСНЕННЯ, РОЗТРАТА МАЙНА", "РАПТОВА СМЕРТЬ", "РОЗБІЙ", "РОЗПОВСЮДЖЕННЯ ПОРНОГРАФІЇ", "РОЗПОВСЮДЖЕННЯ ТВОРІВ НАСИЛЬСТВА", "РОЗПУТНІ ДІЇ (ІНШІ СТАТЕВІ ЗЛОЧИНИ)", "САМОГУБСТВО", "САНКІЦОНОВАНИЙ МІТИНГ", "СІМЕЙНА СВАPКА", "СТИХІЙНЕ ЛИХО", "СУТЕНЕРСТВО", "ТОРГІВЛЯ ЛЮДЬМИ", "ТТУ", "УМИСНЕ ПОШКОДЖЕННЯ МАЙНА", "УТРИМАННЯ МІСЦЬ РОЗПУСТИ", "УТРИМАННЯ НАРКОПРИТОНІВ", "УЧБОВЕ ЗАВДАННЯ", "ХАБАРНИЦТВО", "ХУЛІГАНСТВО", "ШАХРАЙСТВО"]

function update_map(map_data, opts) {
	console.log(opts)
	heatmap.setLatLngs(map_data).setOptions(opts);
	console.log(map_data.length);
}


app = new Vue({
  el: '#app',
  created: function() {
  	update_map(addressPoints);
	this.$set('total',addressPoints.length)
  },
  data: {
  	total:0,
  	filters: {
	  	month_filter: ["01","02","03","04","05","06","07","08","09","10","11","12"],
	  	weekday_filter: ["пн","вт","ср","чт","пт","сб","нд"],
	  	event_filter: get_unique_with_counts(addressPoints, "e")
	  },
	current_filter: {
		month_filter: ["01","02","03","04","05","06","07","08","09","10","11","12"],
		weekday_filter: ["пн","вт","ср","чт","пт","сб","нд"],
	  	hours_filter: {start:0,end:24},
	  	event_filter: "",
		options: {
			radius: 5,
			blur: 10
		},
	}
  },
  methods: {
  	return_label: function(index) {
  		return labels[index];
  	}
  },
  watch: {
  	'current_filter': {
  		handler: function(filter, oldFilter) {

  			// Set initial data and filters
  			var map_data = JSON.parse(JSON.stringify(addressPoints));
  			var filters = this.current_filter;

  			// Filter by event types
  			map_data = map_data.filter(function(el) {
  				return labels[el.e].indexOf(filters.event_filter) >= 0; });

  			// Filter by month
  			map_data = map_data.filter(function(el) {
  				return filters.month_filter.indexOf(el.m) >= 0; });

  			// Filter by weekday
  			map_data = map_data.filter(function(el) {
  				return filters.weekday_filter.indexOf(el.d) >= 0; });

  			// Filter by hours
  			map_data = map_data.filter(function(el) {
  				return (el.h >= filters.hours_filter.start & el.h < filters.hours_filter.end); });

  			// Set data to map
  			this.$set('total',map_data.length)
  			this.$set('filters.event_filter',get_unique_with_counts(map_data, "e"))
  			update_map(map_data,this.current_filter.options);
  		},
  		deep:true
  	}
  }
})

function get_unique(data,key) {
	var lookup = {};
	var items = data;
	var result = [];
	for (var item, i = 0; item = items[i++];) {
	  var name = item[key];
	  if (!(name in lookup)) {
	    lookup[name] = 1;
	    result.push(name);
	  }
	}
	return result;
}

function get_unique_with_counts(data,key) {
	var lookup = {};
	var items = data;
	for (var item, i = 0; item = items[i++];) {
	  var name = item[key];
	  if (!(name in lookup)) {
	    lookup[name] = 1;
	  } else {
	  	lookup[name]+= 1;
	  }
	}
	return lookup;
}

$("#hours").ionRangeSlider({
    type: "double",
    min: 0,
    max: 24,
    step: 1,
    min_interval: 1,
    grid: true,
    grid_snap: true,
    drag_interval: true,
    onFinish: function (data) {
        app.$set("current_filter.hours_filter.start",data.from);
        app.$set("current_filter.hours_filter.end",data.to);
    }
});


/*
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
*/
// Маркеры можно добавлять объектом с идентификаторами и также по ключу их менять

