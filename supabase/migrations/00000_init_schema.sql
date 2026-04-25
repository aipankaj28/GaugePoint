-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Industries Table
CREATE TABLE industries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Defects Table
CREATE TABLE defects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  industry_id UUID REFERENCES industries(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Symptoms Table
CREATE TABLE symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Root Causes Table
CREATE TABLE root_causes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  description TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Linking Table: Defect <-> Symptoms
CREATE TABLE defect_symptoms (
  defect_id UUID REFERENCES defects(id) ON DELETE CASCADE,
  symptom_id UUID REFERENCES symptoms(id) ON DELETE CASCADE,
  PRIMARY KEY(defect_id, symptom_id)
);

-- 6. Linking Table: Defect <-> Root Causes
CREATE TABLE defect_root_causes (
  defect_id UUID REFERENCES defects(id) ON DELETE CASCADE,
  root_cause_id UUID REFERENCES root_causes(id) ON DELETE CASCADE,
  PRIMARY KEY(defect_id, root_cause_id)
);

-- RLS (Row Level Security) - Read Only for anonymous users
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE defects ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE root_causes ENABLE ROW LEVEL SECURITY;
ALTER TABLE defect_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE defect_root_causes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to industries" ON industries FOR SELECT USING (true);
CREATE POLICY "Allow public read access to defects" ON defects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to symptoms" ON symptoms FOR SELECT USING (true);
CREATE POLICY "Allow public read access to root_causes" ON root_causes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to defect_symptoms" ON defect_symptoms FOR SELECT USING (true);
CREATE POLICY "Allow public read access to defect_root_causes" ON defect_root_causes FOR SELECT USING (true);
