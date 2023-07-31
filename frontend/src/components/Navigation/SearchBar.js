import { useHistory } from 'react-router-dom'
import { useState } from 'react';

export default function SearchBar() {

    const history = useHistory();

    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (search) => {
        history.push(`/search/${search}`)
        setSearchInput('')
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (searchInput) {
                history.push(`/search/${searchInput}`)
            }
            else return
            setSearchInput('')
        }
    }


    return (
        <div>
            <form id='search-form'>
                <div className='search-input-and-icon-container'>
                    <input id='search-input'
                        type='text'
                        placeholder='Search'
                        value={searchInput.trimStart()}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleEnterKeyPress}
                    >

                    </input>
                    <span id='search-icon' className="material-symbols-outlined"
                        onClick={() => handleSearch(searchInput)}>
                        search
                    </span>
                </div>
            </form>
        </div>
    )

}
