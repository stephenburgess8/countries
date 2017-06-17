import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Countries from './countries.jsx'

render( <AppContainer><Countries/></AppContainer>, document.querySelector('#app'))

if (module && module.hot) {
  module.hot.accept('./countries.jsx', () => {
    const Countries = require('./countries.jsx').default
    render(
      <AppContainer>
        <Countries/>
      </AppContainer>,
      document.querySelector('#app')
    )
  })
}
