import React, { useState } from 'react';
import axios from 'axios';

const URI = "http://localhost:8000/marvels";

const Header = ({ setSearchedCharacters }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${URI}/search/${searchTerm}`);
            setSearchedCharacters(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error en la búsqueda:', error);
        }
    };

    return (
        <header>
            <div className="p-5 text-center bg-image">
                <div>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div>
                            <h1 className="mb-4">Marvel Cards App</h1>
                            <form className="d-flex form-control rounded" onSubmit={handleSubmit} >
                                <div className="input-group rounded">
                                    <input type="search" value={searchTerm} onChange={handleSearchChange} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                    <span className="input-group-text border-0" id="search-addon">
                                        <button type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header;