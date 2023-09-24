import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa';
import { array, bool } from 'prop-types';

import './repos.scss';

const Repos = () => {
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { query } = useParams();
    useEffect(() => {
        const fetchData = async (query) => {
            try {
                setIsLoading(true);

                const res = await fetch(
                    `https://api.github.com/users/${query}/repos`
                );
                const data = await res.json();

                setRepos(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        fetchData(query);
    }, [query]);

    return (
        <div className='repos'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {repos.length > 0 ? (
                        repos.map((repo) => (
                            <Link
                                to={`/repo/${repo.owner.login}/${repo.name}`}
                                key={repo.id}
                                className='repo'
                            >
                                <div>
                                    <h3>{repo.name}</h3>
                                    <p>{repo.description}</p>
                                </div>
                                <div className='repo__details'>
                                    <div className='repo__wrapper'>
                                        <FaStar className='icon' />
                                        <span>{repo.stargazers_count}</span>
                                    </div>
                                    <div className='repo__wrapper'>
                                        <FaCodeBranch className='icon' />
                                        <span>{repo.forks_count}</span>
                                    </div>
                                    <div className='repo__wrapper'>
                                        <FaEye className='icon' />
                                        <span>{repo.watchers_count}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Directories not found!</p>
                    )}
                </>
            )}
        </div>
    );
};

Repos.propTypes = {
    data: array,
    isLoading: bool,
};

export default Repos;
