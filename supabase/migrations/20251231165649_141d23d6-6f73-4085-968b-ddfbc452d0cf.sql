-- Add UPDATE policy for test_results - users can only update their own results
CREATE POLICY "Users can update their own results"
ON public.test_results
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add DELETE policy for test_results - users can only delete their own results
CREATE POLICY "Users can delete their own results"
ON public.test_results
FOR DELETE
USING (auth.uid() = user_id);