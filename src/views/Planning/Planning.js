import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Planning() {
    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                locale='fa'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                
                events={[
                    { title: 'event 1', date: '2022-11-01' },
                    { title: 'event 2', date: '2022-11-14' },
                    {
                        groupId: '999',
                        title: 'Repeating Event',
                        start: '2022-11-09T16:00:00'
                    },
                    {
                        title: 'Meeting',
                        start: '2022-11-12T10:30:00',
                        end: '2022-11-14T12:30:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2022-11-28'
                    }
                ]}
            />
        </>
    )
}