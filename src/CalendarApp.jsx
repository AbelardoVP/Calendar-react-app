import React from 'react'
import { store } from './components/store/store'

import { AppRouter } from './router/AppRouter'
import { Provider } from 'react-redux'

export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
