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
            <div className="p-5 text-center" id='logoDiv'>
                <img className="image-fluid img-thumbnail" id="logo" src='https://images.squarespace-cdn.com/content/v1/57d1dee3e4fcb5df271a0683/1478382802337-PDO7TN3O88E7N4SB87ZQ/marvel.png' alt=''></img>
            </div>
            <div className="d-flex justify-content-center align-items-center h-100">
                <h1 className="mb-4">Marvel Cards App</h1>
            </div>
            <div id='formDiv' className="d-flex input-group rounded">
                <form className="d-flex form-control rounded" onSubmit={handleSubmit}>
                    <input type="search" value={searchTerm} onChange={handleSearchChange} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <button type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </span>
                </form>
            </div>
        </header >
    )
}

export default Header;