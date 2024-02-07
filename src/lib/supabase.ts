import { createClient } from '@supabase/supabase-js';

import { Database } from '@lb/database';

export const supabase = createClient<Database>(
  'https://euwnyenhzhztqztezjdn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d255ZW5oemh6dHF6dGV6amRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MTk2ODYsImV4cCI6MjAwMzE5NTY4Nn0.BvQkn3zaXnLHgv16quiwvDd4CQ3v1xBRCyg3InBBfgs',
);
