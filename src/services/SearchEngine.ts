import { supabase } from '../lib/supabaseClient';

export interface DefectInsight {
    id: string;
    category: "Manufacturing Defect" | "QA Testing Defect";
    defectName: string;
    symptoms: string[];
    probableCauses: string[];
}

export interface SearchResult {
    defect: DefectInsight;
    score: number;
}

// Executes a basic heuristic search utilizing the Supabase postgres data
export async function searchDefects(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(/\s+/).filter(word => word.length > 2);

    // Fetch from the relational database
    const { data, error } = await supabase
        .from('defects')
        .select(`
      id,
      name,
      category,
      defect_symptoms ( symptoms ( description ) ),
      defect_root_causes ( root_causes ( description ) )
    `);

    if (error || !data) {
        console.error("Database fetch error:", error);
        return [];
    }

    // Transform database payload to the insight model
    const defectsList: DefectInsight[] = data.map((d: any) => ({
        id: d.id,
        defectName: d.name,
        category: d.category,
        symptoms: d.defect_symptoms.map((ds: any) => ds.symptoms.description),
        probableCauses: d.defect_root_causes.map((rc: any) => rc.root_causes.description)
    }));

    // Perform ranking heuristic on the unified records
    const results = defectsList.map(defect => {
        let score = 0;

        const nameLower = defect.defectName.toLowerCase();
        const symptomsStr = defect.symptoms.join(" ").toLowerCase();

        // Direct phrase match heavily prioritized
        if (symptomsStr.includes(lowerQuery)) score += 15;
        if (nameLower.includes(lowerQuery)) score += 10;

        // Keyword matching
        keywords.forEach(kw => {
            if (nameLower.includes(kw)) score += 4;
            if (symptomsStr.includes(kw)) score += 3;
            defect.probableCauses.forEach(cause => {
                if (cause.toLowerCase().includes(kw)) score += 1;
            });
        });

        return { defect, score };
    });

    return results
        .filter(res => res.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6); // Return top 6 appropriate results
}
