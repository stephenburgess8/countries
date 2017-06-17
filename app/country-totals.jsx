import React from 'react'

import './country-totals.scss'

const CountryTotals = ({ count, regions, subregions }) => {
	return (
		<section className='country-totals--container'>
			<div className='country-totals'>
				<header className='country-totals--header'>
					<h2 className='country-totals--header-title'>
						Country Totals
					</h2>
				</header>
				<div className='country-totals--sections'>
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
		</section>
	)
}

const CountriesCount = ({ count, label }) => (
	<div className='country-totals--section country-totals--total'>
		<h4 className='country-totals--total-label'>{ label}</h4>
		<span className='country-totals--total-count'>Count: { count }</span>
	</div>
)

const CountriesRegions = ({ label, regions }) => (
	<div className='country-totals--section country-totals--regions'>
		<h4 className='country-totals--regions-label'>{ label }</h4>
		<span className='country-totals--regions-count-label'>Count: </span>
		<span className='country-totals--regions-count'>{ regions.length }</span>

		<ul className='country-totals--regions-list'>
			{
				regions.map(region => (
					<li className='country-totals--region' key={ region }>
						{ region }
					</li>
				))
			}
		</ul>
	</div>
)

export default CountryTotals

