import { useHistory } from 'react-router-dom'
import { useState } from 'react';

export default function SearchBar() {

    const history = useHistory();

    const [searchInput, setSearchInput] = useState('')


    return (
        <div>
            <form id='search-form'>
                <div className='search-input-and-icon-container'>
                    <input id='search-input'
                        type='text'
                        placeholder='Search'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    >

                    </input>
                    <span id='search-icon' className="material-symbols-outlined"
                    >
                        search
                    </span>
                </div>
            </form>
        </div>
    )

}
