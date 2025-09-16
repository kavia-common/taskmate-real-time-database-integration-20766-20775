# Supabase Configuration for TaskMate

## Database Schema

### Tasks Table

```sql
Table: tasks
Columns:
- id: uuid (Primary Key, Default: gen_random_uuid())
- title: text (NOT NULL)
- description: text (NOT NULL)
- created_at: timestamptz (NOT NULL, Default: now())
```

## Real-time Configuration
- Real-time is enabled for the tasks table
- REPLICA IDENTITY is set to FULL to ensure complete change data

## Row Level Security (RLS) Policies

The following policies are configured for the tasks table:

1. Read Policy (SELECT)
   - Name: "Allow public read access"
   - Access: Public
   - Policy: Allow all reads

2. Insert Policy (INSERT)
   - Name: "Allow public insert access"
   - Access: Public
   - Policy: Allow all inserts

3. Update Policy (UPDATE)
   - Name: "Allow public update access"
   - Access: Public
   - Policy: Allow all updates

4. Delete Policy (DELETE)
   - Name: "Allow public delete access"
   - Access: Public
   - Policy: Allow all deletes

## Environment Variables

Required environment variables for the React frontend:
- REACT_APP_SUPABASE_URL: Your Supabase project URL
- REACT_APP_SUPABASE_KEY: Your Supabase project's anon/public key

## Real-time Subscription

The application uses Supabase's real-time capabilities to subscribe to changes on the tasks table. This is configured in the TaskService class, which handles:

- Real-time subscriptions via Supabase channels
- CRUD operations on tasks
- Automatic updates to the UI when changes occur

## API Usage

The TaskService provides the following methods:
- fetchTasks(): Fetch all tasks
- createTask(task): Create a new task
- updateTask(id, updates): Update an existing task
- deleteTask(id): Delete a task
- subscribeToTasks(callback): Subscribe to real-time updates
