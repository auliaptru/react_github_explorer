import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './home.scss';
import { FaWindowClose } from 'react-icons/fa';

const Home = () => {
    const [query, setQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingSearchHistory =
            JSON.parse(localStorage.getItem('searchHistory')) || [];
        const updatedSearchHistory = [...existingSearchHistory, query];

        localStorage.setItem(
            'searchHistory',
            JSON.stringify(updatedSearchHistory)
        );

        if (query) {
            navigate(`/repo/${query}`);
        }
    };

    useEffect(() => {
        const searchHistoryJSON = JSON.parse(
            localStorage.getItem('searchHistory')
        );
        setSearchHistory(searchHistoryJSON);
    }, []);

    const removeSearchHistory = (name) => {
        const updatedSearchHistory = searchHistory.filter(
            (element) => element !== name
        );
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem(
            'searchHistory',
            JSON.stringify(updatedSearchHistory)
        );
    };

    const handleClick = (historyName) => {
        navigate(`/repo/${historyName}`);
    };

    console.log(searchHistory);

    return (
        <div className='home'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Search user ...'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            <div className='search__history'>
                <h3>Search history :</h3>
                {searchHistory.length > 0 ? (
                    searchHistory.map((result, idx) => (
                        <ul key={idx}>
                            <li onClick={() => handleClick(result)}>
                                <span>{result}</span>
                            </li>
                            <button onClick={() => removeSearchHistory(result)}>
                                <FaWindowClose className='icon' />
                            </button>
                        </ul>
                    ))
                ) : (
                    <p>No search history found!</p>
                )}
            </div>
        </div>
    );
};

export default Home;
