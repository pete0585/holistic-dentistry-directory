-- Tables were created by bootstrap agent. This migration adds indexes,
-- tsvector trigger, and RLS policies.

-- Full-text search trigger
CREATE OR REPLACE FUNCTION holistic_dentist_listings_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.full_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.practice_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.state, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.credentials, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.specialties, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS holistic_dentist_listings_search_trigger ON holistic_dentist_listings;
CREATE TRIGGER holistic_dentist_listings_search_trigger
  BEFORE INSERT OR UPDATE ON holistic_dentist_listings
  FOR EACH ROW EXECUTE FUNCTION holistic_dentist_listings_search_vector();

-- Indexes
CREATE INDEX IF NOT EXISTS holistic_dentist_listings_state_idx ON holistic_dentist_listings(state);
CREATE INDEX IF NOT EXISTS holistic_dentist_listings_city_idx ON holistic_dentist_listings(city);
CREATE INDEX IF NOT EXISTS holistic_dentist_listings_tier_idx ON holistic_dentist_listings(listing_tier);
CREATE INDEX IF NOT EXISTS holistic_dentist_listings_active_idx ON holistic_dentist_listings(is_active, is_approved);
CREATE INDEX IF NOT EXISTS holistic_dentist_listings_search_idx ON holistic_dentist_listings USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS holistic_dentist_listings_outreach_idx ON holistic_dentist_listings(outreach_step, outreach_sent_at) WHERE do_not_email = false;
CREATE INDEX IF NOT EXISTS holistic_dentist_claims_token_idx ON holistic_dentist_claims(token);
CREATE INDEX IF NOT EXISTS holistic_dentist_claims_listing_idx ON holistic_dentist_claims(listing_id);

-- RLS Policies

-- holistic_dentist_listings
ALTER TABLE holistic_dentist_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public listings are viewable by everyone"
  ON holistic_dentist_listings FOR SELECT
  USING (is_active = true AND is_approved = true);

CREATE POLICY "Service role can do everything on listings"
  ON holistic_dentist_listings
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- holistic_dentist_claims
ALTER TABLE holistic_dentist_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on claims"
  ON holistic_dentist_claims
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- holistic_dentist_payments
ALTER TABLE holistic_dentist_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on payments"
  ON holistic_dentist_payments
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- holistic_dentist_leads
ALTER TABLE holistic_dentist_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a lead"
  ON holistic_dentist_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on leads"
  ON holistic_dentist_leads
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
