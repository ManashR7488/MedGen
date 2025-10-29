import { useState, useCallback, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useMedicineStore } from '../../Store/useMedicineStore';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ onSearch, placeholder = 'Search medicines...' }) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { medicines } = useMedicineStore();
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  const suggestions = searchInput
    ? medicines
        .filter(
          (med) =>
            med.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            med.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSuggestionClick = (medicine) => {
    setSearchInput('');
    setShowSuggestions(false);
    navigate(`/store/product/${medicine.id}`);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full md:w-96" ref={searchContainerRef}>
      <div className="relative flex items-center">
        <FiSearch className="absolute left-3 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            // Small delay to allow suggestion click to register before closing
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          placeholder={placeholder}
          className="input input-bordered w-full pl-10 pr-10 rounded-full shadow-md focus:shadow-lg"
        />
        {searchInput && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((medicine) => (
            <button
              key={medicine.id}
              onClick={() => handleSuggestionClick(medicine)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 border-b last:border-b-0 transition-colors flex items-center gap-3"
            >
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 truncate">{medicine.name}</p>
                <p className="text-sm text-gray-500">${medicine.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && searchInput && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
          No medicines found
        </div>
      )}
    </div>
  );
};
