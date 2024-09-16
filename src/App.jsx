import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // Set initial filteredCountries state
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const searchResult = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(searchResult);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  return (
    <Router>
      <div className="App">
        {selectedCountry ? (
          <div className="country-details">
            <button onClick={handleBackClick}>Back to List</button>
            <img
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
            />
            <h1>{selectedCountry.name}</h1>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Population: {selectedCountry.population}</p>
            <p>Area: {selectedCountry.area} km²</p>
            <p>
              Languages:{" "}
              {selectedCountry.languages.map((lang) => lang.name).join(", ")}
            </p>
            <p>
              Currencies:{" "}
              {selectedCountry.currencies.map((curr) => curr.name).join(", ")}
            </p>
          </div>
        ) : (
          <>
            <div id="search-container">
              <input
                type="text"
                id="search-input"
                placeholder="Search for a country"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button id="search-button" onClick={handleSearchButtonClick}>
                Search
              </button>
            </div>
            <div id="country-list">
              {filteredCountries.length === 0 ? (
                <div id="no-result" className="no-result">
                  No country found!
                </div>
              ) : (
                <div className="country-grid">
                  {filteredCountries.map((country) => (
                    <div
                      className="country-card"
                      key={country.alpha2Code}
                      onClick={() => handleCountryClick(country)}
                    >
                      <div className="flag-container">
                        <img
                          className="country-flag"
                          src={country.flag}
                          alt={`${country.name} flag`}
                        />
                      </div>
                      <div className="country-info">
                        <h4>{country.name}</h4>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
