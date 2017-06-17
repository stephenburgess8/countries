import React, { Component } from 'react'
import CountryResults from './country-results'
import CountryTotals from './country-totals'
import './styles/index.scss'

export default class Countries extends Component {
  render() {
	const countries = {
		count: 1,
		regions: [
			'North America'
		],
		subregions: [
			'United States'
		],
		countries: [
			{
				name: 'United States',
				flag: <img src='#' alt='United States' />,
				population: '100',
				alphaCode2: 24,
				alphaCode3: 36,
				region: 'North America',
				subregion: 'United States',
				languages: [
					'English',
					'Spanish',
					'French',
					'German'
				]
			}
		]
	}

	return (
		<div className='countries'>
			<Header headerText='Countries' />
			<CountryForm placeholder='Argentina...' />
			<CountryResults countries={ countries.countries } />
			<CountryTotals
				count={ countries.count }
				regions={ countries.regions }
				subregions={ countries.subregions }
			/>
		</div>
	)
  }
}			

const Header = ({ headerText }) => <h1 className='countries--header'>{ headerText }</h1>

const CountryForm = ({ placeholder }) => {
	return (
		<div className='country-form--wrapper'>
			<form
				action='../src/countries.php' 
				className='country-form'
				id='countries'
				method='get'
				name='countries'
			>
				<label
					className='country-form--label'
					htmlFor='countryInput'
				>Country</label>
				<input
					className='country-form--input'
					id='countryInput'
					name='countryInput'
					placeholder={ placeholder }
					type='text'
				/>
				<input
					className='country-form--submit'
					name='countrySubmit'
					type='submit'
					value='Enter'
				/>
			</form>
		</div>
	)
}
