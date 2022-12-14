import { createClient } from '@supabase/supabase-js'



const supabaseId = process.env.NEXT_PUBLIC_SID




const supabaseUrl = "https://lrxwwokfikcwzzshrdcp.supabase.co";


export const supabase = createClient(supabaseUrl, supabaseId)