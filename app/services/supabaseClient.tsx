import { SUPABASE_API_KEY, SUPABASE_URL } from '@/app/services/credentials'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)