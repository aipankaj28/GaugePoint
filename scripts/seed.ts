import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { defectsData } from '../src/data/defectsData.js';
import path from 'path';

// Load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing Supabase Service Key or URL. Seed script requires the privileged secret key.");
    process.exit(1);
}

// Proceed with privileged client allowing insert override
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function runSeed() {
    console.log("Starting data migration...");

    // 1. Create Industry
    const { data: industry, error: iErr } = await supabase
        .from('industries')
        .upsert({ name: 'Plastic Extrusion', description: 'Manufacturing of plastic pipes and profiles' }, { onConflict: 'name' })
        .select()
        .single();

    if (iErr) throw new Error(`Industry Error: ${iErr.message}`);
    const industryId = industry.id;

    for (const defect of defectsData) {
        // 2. Insert Defect
        const { data: dbDefect, error: dErr } = await supabase
            .from('defects')
            .insert({
                industry_id: industryId,
                name: defect.defectName,
                category: defect.category
            })
            .select()
            .single();

        if (dErr) throw new Error(`Defect Error on ${defect.defectName}: ${dErr.message}`);
        const defectId = dbDefect.id;

        // 3. Insert Symptoms & Create Link
        for (const symptom of defect.symptoms) {
            // Upsert symptom
            const { data: sym, error: sErr } = await supabase
                .from('symptoms')
                .upsert({ description: symptom }, { onConflict: 'description' })
                .select()
                .single();
            if (sErr) throw new Error(`Symptom Error: ${sErr.message}`);

            // Link
            await supabase.from('defect_symptoms').insert({ defect_id: defectId, symptom_id: sym.id });
        }

        // 4. Insert Root Causes & Create Link
        for (const cause of defect.probableCauses) {
            const { data: rc, error: cErr } = await supabase
                .from('root_causes')
                .upsert({ description: cause }, { onConflict: 'description' })
                .select()
                .single();
            if (cErr) throw new Error(`Cause Error: ${cErr.message}`);

            // Link
            await supabase.from('defect_root_causes').insert({ defect_id: defectId, root_cause_id: rc.id });
        }
    }

    console.log("Migration completed successfully!");
}

runSeed().catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});
