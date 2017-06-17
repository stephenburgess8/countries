import React from 'react'
import { escapeLabelText } from './services/string-service'

const CountryResults = ({ countries }) => {
	const columns = [
		'Flag',
		'Name',
		'Population',
		'Alpha Code 2',
		'Alpha Code 3',
		'Region',
		'Subregion',
		'Languages'
	]

	return (
		<div className='country-results--wrapper'>
			<table className='country-results'>
				<CountriesHeader columns={ columns } />
				<CountriesBody
					columns={ columns }
					countries={ countries }
				/>
			</table>
		</div>
	)
}

const CountriesHeader = ({ columns }) => (
	<thead className='country-results--head'>
		<tr className='country-results--row'>
			{
				columns.map(column => (
					<th className='country-results--header' key={ column }>
						{ column }
					</th>
				))
			}
		</tr>
	</thead>
)

const CountriesBody = ({ columns, countries }) => {
	return (
		<tbody className='country-results--body'>
			{
				countries.map(country => (
					<CountryProperties
						columns={ columns }
						country={ country }
						key={ country.name }
					/>
				))
			}
		</tbody>
	)
}

const CountryProperties = ({ columns, country }) => {
	const properties = (
		<tr className='country-results--row' key={ country.name }>
		{
			columns.map(column => {
				const property = escapeLabelText(column)

				const cellClassName = `country-results--cell country-results--row__${ property }`
				const isLanguages = property === 'languages'
				return (
					<td className={ cellClassName } key={ property }>
						{
							isLanguages
								? <Languages languages={ country[property] } />
								: country[property]
						}
					</td>
				)
			})
		}
		</tr>
	)

	return properties
}

const Languages = ({ languages }) => (
	<ul className='country-results--languages'>
		{
			languages.map(language => (
				<li className='country-results--language' key={ language }>
					{ language }
				</li>
			))
		}
	</ul>
)

export default CountryResults

