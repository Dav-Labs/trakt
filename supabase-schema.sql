-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create locations table
create table public.locations (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories on delete cascade not null,
  name text not null,
  description text,
  state text,
  latitude decimal,
  longitude decimal,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create check_ins table
create table public.check_ins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  location_id uuid references public.locations on delete cascade not null,
  checked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, location_id)
);

-- Set up Row Level Security (RLS)

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.locations enable row level security;
alter table public.check_ins enable row level security;

-- Users policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Categories policies (public read)
create policy "Anyone can view categories"
  on public.categories for select
  to authenticated
  using (true);

-- Locations policies (public read)
create policy "Anyone can view locations"
  on public.locations for select
  to authenticated
  using (true);

-- Check-ins policies
create policy "Users can view all check-ins"
  on public.check_ins for select
  to authenticated
  using (true);

create policy "Users can insert their own check-ins"
  on public.check_ins for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own check-ins"
  on public.check_ins for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own check-ins"
  on public.check_ins for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index idx_locations_category_id on public.locations(category_id);
create index idx_locations_state on public.locations(state);
create index idx_check_ins_user_id on public.check_ins(user_id);
create index idx_check_ins_location_id on public.check_ins(location_id);
create index idx_check_ins_checked_at on public.check_ins(checked_at desc);

-- Create a function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically create user profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert initial categories
insert into public.categories (name, slug, icon) values
  ('National Parks', 'national-parks', '🏞️'),
  ('State Parks', 'state-parks', '🌲'),
  ('Baseball Stadiums', 'baseball-stadiums', '⚾'),
  ('Ski Resorts', 'ski-resorts', '⛷️'),
  ('Museums', 'museums', '🎨');

