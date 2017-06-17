import React from 'react'

const CountryTotals = ({ count, regions, subregions }) => {
	return (
		<div className='country-totals--container'>
			<div className='country-totals'>
				<CountriesCount
					count={ count }
					label='Countries'
				/>
				<CountriesRegions
					label='Regions'
					regions={ regions }
				/>
				<CountriesRegions
					label='Subregions'
					regions={ subregions }
				/>
			</div>
		</div>
	)
}

const CountriesCount = ({ count, label }) => (
	<div className='country-totals--total'>
		<h4 className='country-totals--total-label'>{ label}</h4>
		<span className='country-totals--total-count'>{ count }</span>
	</div>
)

const CountriesRegions = ({ label, regions }) => (
	<div className='country-totals--regions'>
		<h4 className='country-totals--regions-label'>{ label }</h4>
		<ul className='country-totals--regions-list'>
			{
				regions.map(region => (
					<li className='country-totals--region' key={ region }>
						{ region }
					</li>
				))
			}
		</ul>

		<span className='country-totals--regions-count-label'>Count: </span>
		<span className='country-totals--regions-count'>{ regions.length }</span>
	</div>
)

export default CountryTotals

