function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// url of bank
let bank_url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

$.ajax({
	url: bank_url,
	method: 'POST',
	dataType: 'json',
}).done(function( resp ){
	let tmpArr = [];
	resp.forEach(function (currentValue, index) {
		if(currentValue.cc == 'XPT' || currentValue.cc == 'XPD' || currentValue.cc == 'XAG' || currentValue.cc == 'XAU'){
			return;
		} else {
			tmpArr.push(currentValue);
		}
	});
		new Vue({
			el: '#app',
			data: {
				data: tmpArr,
				curFrom: '',
				curTo: '',
				count: '',
				fromLabel: '',
				toLabel: ''
			},
			methods: {
				reverse: function(){
					let tmp = this.curFrom;
					this.curFrom = this.curTo;
					this.curTo = tmp;
				}
			},
			computed: {
				result: function(){
					let res;
					let totalFrom = this.count * this.curFrom;
					let totalTo = this.count * this.curTo;
					res = this.count * (totalFrom.toFixed(2) / totalTo.toFixed(2));	
					if(isNumeric(res)){
						return 'Сума: ' + res.toFixed(2);
					}
				}
			}
		});
	});


