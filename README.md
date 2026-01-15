# SnippetBox

A modern, full-stack code snippet manager built with **Next.js 16**, **Supabase**, and **Tailwind CSS**. Users can store, manage, and share code snippets with syntax highlighting.

**Live Demo:** https://snippetbox-three.vercel.app/  

## Features

- **Authentication:** Secure Sign-up and Login via Supabase Auth.
- **Dashboard:** Private management of code snippets (Create, Read, Update, Delete).
- **Public Feed:** Explore snippets shared by the community.
- **Search & Filtering:** Real-time URL-based search and pagination.
- **Syntax Highlighting:** Professional code rendering using **Shiki**.
- **Security:** Row Level Security (RLS) ensures users can only edit their own data.
- **Modern UI:** Built with **Shadcn/UI** and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS, Shadcn UI, Lucide Icons
- **Deployment:** Vercel

## Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/NVK222/snippet-app.git
cd snippet-app
```

### 2. Install dependencies
```bash
pnpm install
```
### 3. Configure Environment Variables

Create a .env.local file in the root directory:
```bash

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```
### 4. Setup Database (Supabase)

Run the following SQL in your Supabase SQL Editor to create the table and security policies:
```SQL

-- Create the table
create table snippets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  code text not null,
  language text not null default 'javascript',
  is_public boolean default false not null,
  user_id uuid references auth.users not null
);

-- Enable Row Level Security
alter table snippets enable row level security;

-- Policy 1: Everyone can view public snippets
create policy "Public snippets are viewable by everyone"
  on snippets for select
  using ( is_public = true );

-- Policy 2: Users can view their own private snippets
create policy "Users can see their own snippets"
  on snippets for select
  using ( auth.uid() = user_id );

-- Policy 3: Users can insert their own snippets
create policy "Users can create snippets"
  on snippets for insert
  with check ( auth.uid() = user_id );

-- Policy 4: Users can update their own snippets
create policy "Users can update their own snippets"
  on snippets for update
  using ( auth.uid() = user_id );

-- Policy 5: Users can delete their own snippets
create policy "Users can delete their own snippets"
  on snippets for delete
  using ( auth.uid() = user_id );
```
### 5. Run the development server
```bash
pnpm dev
```
Open http://localhost:3000 with your browser to see the result.
