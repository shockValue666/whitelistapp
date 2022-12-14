import { createClient } from '@supabase/supabase-js'

console.log("supabase url : ", process.env.REACT_APP_SUPABASE_URL)
console.log("supabase key : ", process.env.REACT_APP_SUPABASE_ANON_KEY)

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseUrl = 'https://jnwiyboqsppqbnwfivbb.supabase.co'
const supabaseUrl = "https://lrxwwokfikcwzzshrdcp.supabase.co";
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impud2l5Ym9xc3BwcWJud2ZpdmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMjI2NzAsImV4cCI6MTk4MzY5ODY3MH0.LwxGzSd67ARY9CLm_NYK1NstOKWyD1gGzez3M857zZw"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeHd3b2tmaWtjd3p6c2hyZGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4NDc5NjAsImV4cCI6MTk4NjQyMzk2MH0.JPEeP35gvIeTx8Mq0MalpOKOrl-IAjsHn8si5xzW0s0"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)