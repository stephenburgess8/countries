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
			},
			error: null
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
				<InvalidInput
					count={ countries.countries.length }
					error={ this.state.error }
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
		if (data.length !== 0) {
			$.ajax({
			    url: 'http://localhost:9999/src/countries.php',
			    type: "GET",
			    dataType: 'jsonp',
				crossDomain: true,
				data: {
			        countryInput: data
			    },
			    success: function (data) {
			        this.setState({
			        	countries: data,
			        	error: null
			        })
			    }.bind(this),
			    error: function (jqXHR, textStatus, errorThrown) {
			    	this.setState({ error: textStatus })
			        console.error(textStatus);
			    }.bind(this)
			})
		}
		else {
			this.setState({ error: 'Invalid input' })
		}
	}
}			

const Header = ({ headerText }) => (
	<header className='countries--header'>
		<h1 className='countries--header-title'>{ headerText }</h1>
	</header>
)

const InvalidInput = ({ count, error }) => {
	if (count === 0 || error) {
		return (
			<div className='country-form--error'>
				<span className='country-form--error-text'>
					{
						error
							? 'There was a problem with your request: ' + error
							: 'No Results Found'
					}
				</span>
			</div>
		)
	}

	return null
}

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
