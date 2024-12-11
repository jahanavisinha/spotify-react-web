import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SearchPage.css"; // Add styles here

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const searchResults = await fetchSearchResults(query);
                setResults(searchResults);
            } catch (err) {
                console.error("Error fetching search results:", err);
                setError("Failed to fetch search results. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query]);

    return (
        <div className="search-page">
            <header>
                <h1>Search Results for "{query}"</h1>
            </header>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : results.length > 0 ? (
                <div className="results-container">
                    {results.map((item: any) => (
                        <div key={item.id} className="result-card">
                            <h3>{item.name}</h3>
                            <p>{item.artist || "Unknown Artist"}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchPage;
