import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './repoDirs.scss';

const RepoDirs = () => {
    const [dirs, setDirs] = useState();
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const { user, name } = useParams();

    useEffect(() => {
        setLoading(true);
        async function fetchData(user, name) {
            try {
                const resp = await fetch(
                    `https://api.github.com/repos/${user}/${name}`
                );
                const data = await resp.json();
                setDirs(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData(user, name);
    }, [user, name]);

    const handleCopyClick = () => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='repo__content'>
                    <div className='repo__top'>
                        <h3>Repository Details</h3>
                        <Link to={`/repo/${user}`} className='link back'>
                            Back to repositories
                        </Link>
                    </div>
                    {dirs && (
                        <>
                            <div className='repo__desc'>
                                <h3>{name}</h3>
                                <p>{dirs.description}</p>
                                <p>
                                    Created at:{' '}
                                    {dirs.created_at.substring(0, 10)}
                                </p>
                            </div>
                            <div className='repo__details'>
                                <div className='repo__wrapper'>
                                    <FaStar className='icon' />
                                    <span>{dirs.stargazers_count}</span>
                                </div>
                                <div className='repo__wrapper'>
                                    <FaCodeBranch className='icon' />
                                    <span>{dirs.forks_count}</span>
                                </div>
                                <div className='repo__wrapper'>
                                    <FaEye className='icon' />
                                    <span>{dirs.watchers_count}</span>
                                </div>
                            </div>
                            <div className='repo__links'>
                                <div className='repo__clone'>
                                    <CopyToClipboard
                                        text={dirs.clone_url}
                                        onCopy={handleCopyClick}
                                    >
                                        <button className='link'>Clone</button>
                                    </CopyToClipboard>
                                    {copied && <span>Copied!</span>}
                                </div>
                                <Link
                                    to={dirs.html_url}
                                    className='link'
                                    target='__blank'
                                >
                                    Go to Github
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default RepoDirs;
