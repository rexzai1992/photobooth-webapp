/*
  # Create Photos Table

  1. New Tables
    - `photos`
      - `id` (uuid, primary key) - Unique identifier for each photo
      - `image_data` (text) - Base64 encoded image data
      - `created_at` (timestamptz) - When the photo was uploaded
      - `printed` (boolean) - Whether the photo has been printed
  
  2. Security
    - Enable RLS on `photos` table
    - Add policy for anyone to insert photos (public photobooth)
    - Add policy for authenticated users to view all photos (admin access)
    - Add policy for authenticated users to update printed status
*/

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_data text NOT NULL,
  created_at timestamptz DEFAULT now(),
  printed boolean DEFAULT false
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert photos (public photobooth access)
CREATE POLICY "Anyone can upload photos"
  ON photos
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all photos (admin access)
CREATE POLICY "Authenticated users can view all photos"
  ON photos
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update printed status
CREATE POLICY "Authenticated users can update photos"
  ON photos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);