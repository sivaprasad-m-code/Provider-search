import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [therapyType, setTherapyType] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('searchTerm') || '';
  const address = queryParams.get('address') || '';

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4004/providers?searchTerm=${searchTerm}&address=${address}&therapyType=${therapyType}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error.response || error.message);
        setError('Failed to fetch providers.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [searchTerm, address, therapyType]);

  const TherapyTypeChange = (event) => {
    const selectedTherapyType = event.target.value;
    setTherapyType(selectedTherapyType);
    const params = new URLSearchParams(location.search);
    params.set('therapyType', selectedTherapyType);
    navigate({ search: params.toString() });
  };

  return (
    <div className='container mx-auto p-4'>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className="mb-4">
        <label htmlFor="therapyType" className="mr-2">Select Therapy Type:</label>
        <select
          id="therapyType"
          value={therapyType}
          onChange={TherapyTypeChange}
          className="border p-2" >
          <option value="">All</option>
          <option value="In-Clinic">In-Clinic</option>
          <option value="In-Home">In-Home</option>
          <option value="Virtual">Virtual</option>
        </select>
      </div>

        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Provider Name</th>
              <th className='border px-4 py-2'>Address</th>
              <th className='border px-4 py-2'>Therapy Type</th>
            </tr>
          </thead>
          <tbody>
            {results.map((provider, index) => (
              <tr key={index}>
                <td className='border px-4 py-2'>{provider.name}</td>
                <td className='border px-4 py-2'>{provider.address}</td>
                <td className='border px-4 py-2'>{provider.therapyType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      

      {!loading && !error && results.length === 0 && (
        <p>No providers found for the given search criteria.</p>
      )}
    </div>
  );
};

export default SearchPage;
