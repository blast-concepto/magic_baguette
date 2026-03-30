import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://oqllhwrhsgdjucmxtbjh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xbGxod3Joc2dkanVjbXh0YmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTcyOTMsImV4cCI6MjA5MDM3MzI5M30.9IipnmmJ8n2i-TH0kz0qAZDZVmgJ1QDf7xogMd4X0e4',
);
