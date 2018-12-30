<?php

if( isset( $_POST['key'] ) && $_POST['key'] == 'getExchange' ){
	// url банка
	$bank_url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
	// получаем ответ в строке
	$data =  file_get_contents( $bank_url );
	// преобразовуем в массив
	$data = json_decode( $data, true );

	$metal = ['XPT', 'XPD', 'XAG', 'XAU'];

	$tmp_arr = [];
	$i = 0;
	// удаляем не нужные элементы
	foreach ($data as $value ) {
		if( in_array($value['cc'], $metal) ){
			continue;
		} else {
			$tmp_arr[$i]["txt"] = $value["txt"];
			$tmp_arr[$i]["rate"] = $value["rate"];
			$tmp_arr[$i]["cc"] = $value["cc"];
		}
		$i++;
	}

	// возвращаем на фронт
	echo json_encode( $tmp_arr );

} else {
	exit( 'You shouldn`t be here!' );
}