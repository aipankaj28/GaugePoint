import { useState, useCallback } from 'react'
import { SearchBar } from './components/SearchBar'
import { ResultsList } from './components/ResultsList'
import { searchDefects, type SearchResult } from './services/SearchEngine'
import { Factory } from 'lucide-react'
import './index.css'
import './App.css'

function App() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [queryLength, setQueryLength] = useState(0)

  // Use callback to debounce in the future if necessary
  const handleSearch = useCallback(async (query: string) => {
    setQueryLength(query.trim().length);
    if (query.trim().length >= 3) {
      const result = await searchDefects(query);
      setResults(result);
    } else {
      setResults([]);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="header animate-fade-in">
        <h1>
          <Factory size={48} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '16px', color: 'var(--text-accent)' }} />
          GaugePoint Insight
        </h1>
        <p>Intelligent root cause analysis for plastic extrusion defects. Describe the symptoms below.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <ResultsList results={results} queryLength={queryLength} />
    </div>
  )
}

export default App
