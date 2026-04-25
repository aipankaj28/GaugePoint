import { useState } from 'react';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        onSearch(val);
    };

    const toggleVoice = () => {
        // Scaffolded for future voice integration
        setIsListening(!isListening);
    };

    return (
        <div className="search-container animate-fade-in">
            <div className="search-input-wrapper glass">
                <Search className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Describe the manufacturing defect (e.g., 'pipe has uneven thickness')"
                    value={query}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button
                    className={`voice-btn ${isListening ? 'active' : ''}`}
                    onClick={toggleVoice}
                    title="Voice search coming soon"
                >
                    <Mic size={20} />
                </button>
            </div>
        </div>
    );
}
