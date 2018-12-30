function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$.ajax({
	url: 'exchange.php',
	method: 'POST',
	dataType: 'json',
	data: {
		key: 'getExchange'
	}
}).done(function( resp ){	
		new Vue({
			el: '#app',
			data: {
				data: resp,
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