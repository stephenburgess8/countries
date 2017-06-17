import React, { Component } from 'react'
import $ from 'jquery'
import CountryResults from './country-results'
import CountryTotals from './country-totals'
import './styles/index.scss'

export default class Countries extends Component {
	constructor() {
		super()

		this.state = {
			countries: {
				regions: [ ],
				subregions: [ ],
				countries: [ ]
			}
		}

		this._onSubmit = this._submit.bind(this)
	}

	componentDidMount() {
		this._makeAjaxRequest('USA')
	}

  	render() {
		const countries = this.state.countries

		return (
			<div className='countries'>
				<Header headerText='Countries' />
				<CountryForm 
					label='Enter Country'
					onSubmit={ this._onSubmit }
					placeholder='Argentina...'
					inputRef={ el => this.inputElement = el }
				/>
				<CountryResults countries={ countries.countries } />
				<CountryTotals
					count={ countries.countries.length }
					regions={ countries.regions }
					subregions={ countries.subregions }
				/>
			</div>
		)
  	}

	_submit(event) {
		event.preventDefault();

		this._makeAjaxRequest(this.inputElement.value)
	}

	_makeAjaxRequest(data) {
		$.ajax({
		    url: 'http://localhost:9999/src/countries.php',
		    type: "GET",
		    dataType: 'jsonp',
			crossDomain: true,
			data: {
		        countryInput: data
		    },
		    success: function (data) {
		        this.setState({ countries: data })
		    }.bind(this),
		    error: function (jqXHR, textStatus, errorThrown) {
		        console.error(textStatus);
		    }.bind(this)
		})
	}
}			

const Header = ({ headerText }) => (
	<header className='countries--header'>
		<h1 className='countries--header-title'>{ headerText }</h1>
	</header>
)

const CountryForm = ({ label, inputRef, onSubmit, placeholder }) => {
	return (
		<section className='country-form--wrapper'>
			<form
				className='country-form'
				id='countries'
				method='get'
				onSubmit={ onSubmit }
				name='countries'
			>
				<label
					className='country-form--label'
					htmlFor='countryInput'
				>{ label }</label>
				<input
					className='country-form--input'
					id='countryInput'
					name='countryInput'
					placeholder={ placeholder }
					ref={ inputRef }
					type='text'
				/>
				<input
					className='country-form--submit'
					name='countrySubmit'
					type='submit'
					value='Enter'
				/>
			</form>
		</section>
	)
}
