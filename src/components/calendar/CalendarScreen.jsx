import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive } from '../../actions/calendarEvents'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment)





export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)


    const onDoubleClick = (e) => {
        console.log("click", e);
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        console.log("select", e);
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) => {
        console.log("change view", e);
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }





    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
                onSelectSlot={onSelectSlot}
                selectable={true}
                style={{ height: 830 }}
            />
            <AddNewFab />
            {
                (activeEvent) && <DeleteEventFab />

            }
            <CalendarModal />
        </div>
    )
}
