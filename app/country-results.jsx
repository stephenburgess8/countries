import React from 'react'
import { escapeLabelText } from './services/string-service'

import './country-results.scss'

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
		<section className='country-results--wrapper'>
			<table className='country-results'>
				<CountriesHeader columns={ columns } />
				<CountriesBody
					columns={ columns }
					countries={ countries }
				/>
			</table>
		</section>
	)
}

const CountriesHeader = ({ columns }) => (
	<thead className='country-results--head'>
		<tr className='country-results--header-row'>
			{
				columns.map(column => {
					const property = escapeLabelText(column)

					const cellClassName = `country-results--header-cell country-results--cell__${ property }`
					const isLanguages = property === 'languages'
					return (
						<th className={ cellClassName } key={ property }>
							{ column }
						</th>
					)
				})
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

				const cellClassName = `country-results--cell country-results--cell__${ property }`
				const isLanguages = property === 'languages'
				const isImage = property === 'flag'

				if (property === 'population') {
					country[property] = parseInt(country[property]).toLocaleString('en-US')
				}

				return (
					<td className={ cellClassName } key={ property }>
						{
							isLanguages
								? <Languages languages={ country[property] } />
								: (
									isImage
										? <img
											alt={ country.name }
											className='country-results--image'
											src={ country[property] } 
										  />
										: country[property]
								)
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

