import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suggestions } from './suggestions'; 


const SuggestionsComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const Search = () => {
    const params = new URLSearchParams({
      searchTerm,
      address,
    });

    navigate(`/search?${params.toString()}`);
   
  };

  return (
    <div className='ml-20'>
      <div className="search-form mt-10  space-x-10">
        <select value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border rounded-lg p-2'>
          {suggestions.map((option, index) => (
            <option key={index} value={option.value} disabled={option.isDisabled}>
              {option.label}
            </option>
          ))}
        </select>

        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className='border rounded-lg p-2'/>

        <button onClick={Search} className='border rounded-lg p-2 text-xs w-40 bg-blue-600 text-white'>Search</button>
      </div>

    </div>
  );
};

export default SuggestionsComponent;
