import type { SearchResult } from '../services/SearchEngine';
import { AlertCircle, Target, Activity } from 'lucide-react';

interface ResultsListProps {
    results: SearchResult[];
    queryLength: number;
}

export function ResultsList({ results, queryLength }: ResultsListProps) {
    if (queryLength < 3) {
        return (
            <div className="empty-state animate-fade-in">
                <Activity size={48} />
                <h3>Awaiting Symptoms</h3>
                <p>Type at least 3 characters to start diagnosing manufacturing issues.</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="empty-state animate-fade-in">
                <AlertCircle size={48} />
                <h3>No Diagnosis Found</h3>
                <p>Could not map the given symptoms to known extrusion defects.</p>
            </div>
        );
    }

    return (
        <div className="results-container animate-fade-in">
            <div className="results-header">
                <span className="section-title">Possible Root Causes</span>
                <span className="section-title">{results.length} Matches</span>
            </div>

            {results.map(({ defect }) => (
                <div key={defect.id} className="result-card glass">
                    <div className="result-header">
                        <h3 className="defect-title">
                            <Target size={20} color="var(--text-accent)" />
                            {defect.defectName}
                        </h3>
                        <span className="defect-category">{defect.category}</span>
                    </div>

                    <div className="result-body">
                        <div>
                            <h4 className="section-title">Matched Symptoms</h4>
                            <ul className="symptoms-list">
                                {defect.symptoms.map((symptom, idx) => (
                                    <li key={idx}>{symptom}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="section-title">Probable Root Causes</h4>
                            <ul className="causes-list">
                                {defect.probableCauses.map((cause, idx) => (
                                    <li key={idx}>{cause}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
