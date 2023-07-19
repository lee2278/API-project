import { useState } from 'react'

export default function EditDatesModal() {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <>
            <div>
                <p>nights</p>
                <form>
                    <div className='date-selection-wrapper'>
                        <label>CHECK-IN
                            <input className='check-in-out-date-inputs'
                                type='date'
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                            >
                            </input>
                        </label>

                        <label>CHECK-OUT
                            <input className='check-in-out-date-inputs'
                                type='date'
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                            >
                            </input>
                        </label>
                    </div>
                </form>
            </div>
        </>
    )
}
