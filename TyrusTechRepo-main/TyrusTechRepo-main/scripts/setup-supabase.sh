#!/bin/bash

# This script sets up the Supabase environment for the digitization platform.

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "Supabase CLI could not be found. Please install it first."
    exit 1
fi

# Initialize Supabase project
supabase init

# Create a new database
supabase db create

# Apply migrations
supabase db push

# Start Supabase local development
supabase start

echo "Supabase setup completed successfully."