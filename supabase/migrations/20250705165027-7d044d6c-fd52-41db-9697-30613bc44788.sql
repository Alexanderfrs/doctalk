-- Rename beta_subscribers table to alpha_subscribers
ALTER TABLE public.beta_subscribers RENAME TO alpha_subscribers;

-- Update the RLS policies to reference the new table name
DROP POLICY IF EXISTS "Allow authenticated users to view beta signups" ON public.beta_subscribers;
DROP POLICY IF EXISTS "Allow public to insert beta signups" ON public.beta_subscribers;

-- Create new RLS policies for alpha_subscribers
CREATE POLICY "Allow authenticated users to view alpha signups" 
ON public.alpha_subscribers 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow public to insert alpha signups" 
ON public.alpha_subscribers 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);