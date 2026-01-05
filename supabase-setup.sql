-- Create the subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for now - you can restrict this later)
CREATE POLICY "Allow all operations" ON subscribers
  FOR ALL USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_subscribers_updated_at 
  BEFORE UPDATE ON subscribers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert a test subscriber (optional - you can delete this later)
-- INSERT INTO subscribers (email, user_agent, ip_address) 
-- VALUES ('test@example.com', 'Test User Agent', '127.0.0.1');
