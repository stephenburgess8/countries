<?php
	// Main
	session_start();
	if(isset($_SESSION['countries'])) {
		$countries = unserialize($_SESSION['countries']);
	}
	else {
		$response = getCountriesResponse();
		$formattedCountries = formatCountries($response);

		$_SESSION['countries'] = serialize($formattedCountries);
		$countries = $formattedCountries;
	}

	$search = $_GET['countryInput'];
	$results = getCountriesByInput($search, $countries);

	echo $_GET['callback'] . '('.html_entity_decode(json_encode($results)).')';
	// End Main

	function getCountriesByInput($search, $allCountries) {
		$countries = [];
		$regions = [];
		$subregions = [];

		foreach ($allCountries as $country) {
			$countryMatchesSearchInput = false;

			$searchFields = [
				strtolower($country['name']),
				strtolower($country['alphaCode2']),
				strtolower($country['alphaCode3'])
			];

			foreach ($searchFields as $countryProperty) {
			     if (strpos($countryProperty, strtolower($search)) !== false) {
			        $countryMatchesSearchInput = true;
			    }
			}

			if ($countryMatchesSearchInput) {
				array_push($countries, $country);
				
				$regionIsPresent = strlen($country['region']) > 0;
				if($regionIsPresent && !in_array($country['region'], $regions)) {
					array_push($regions, $country['region']);
				}
				
				$subregionIsPresent = strlen($country['subregion']) > 0;
				if($subregionIsPresent && !in_array($country['subregion'], $subregions)) {
					array_push($subregions, $country['subregion']);
				}
			}
		}

		$results = array(
			'search' => $search,
			'countries' => $countries,
			'regions' => $regions,
			'subregions' => $subregions
		);

		return $results;
	}

	function getCountriesResponse() {
	    $curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://restcountries.eu/rest/v2/all",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET",
			CURLOPT_HTTPHEADER => array(
			"cache-control: no-cache"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);
		return json_decode($response, true);
	}

	function formatCountries($response) {
		$countries = [];

		foreach ($response as $country) {
			$formattedCountry = array(
				"name" => $country["name"],
				"alphaCode2" => $country["alpha2Code"],
				"alphaCode3" => $country["alpha3Code"],
				"flag" => $country["flag"],
				"population" => $country["population"],
				"region" => $country["region"],
				"subregion" => $country["subregion"]
	        );

			$formattedCountry = array_map('htmlentities', $formattedCountry);

			$languages = [];
			foreach ($country["languages"] as $language) {
				array_push($languages, $language["name"]);
			}
			$languages = array_map('htmlentities', $languages);

			$formattedCountry['languages'] = $languages;

			array_push($countries, $formattedCountry);
		}

	    return $countries;
	}
?>
