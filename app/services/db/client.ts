import { SUPABASE_API_KEY, SUPABASE_URL } from '@/app/services/db/credentials'
import { createClient } from '@supabase/supabase-js'

const dbUrl = SUPABASE_URL
const dbApiKey = SUPABASE_API_KEY
export const database = createClient(dbUrl, dbApiKey)