import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suggestions } from './suggestions';

const table = () => {
  const [selectedService, setSelectedService] = useState(''); 
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams({
      services: selectedService, 
      address,
    });

    navigate(`/search?${params.toString()}`); 
  };

  return (
    <div className='ml-20'>
      <div className="search-form mt-10 space-x-10">
        <select 
          value={selectedService} 
          onChange={(e) => setSelectedService(e.target.value)} 
          className='border rounded-lg p-2'
        >
          <option value="" disabled>Select a service</option>
          {suggestions.map((option, index) => (
            <option key={index} value={option.value} disabled={option.isDisabled}>
              {option.label}
            </option>
          ))}
        </select>

        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter address" 
          className='border rounded-lg p-2'
        />

        <button 
          onClick={handleSearch} 
          className='border rounded-lg p-2 text-xs w-40 bg-blue-600 text-white'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default table;
