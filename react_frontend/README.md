# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Supabase Integration (Initial Setup)

This template is pre-configured to use Supabase as a backend.

### 1) Install dependencies
Already included in `package.json`:
- `@supabase/supabase-js`
If you need to reinstall, run:
```bash
npm install
```

### 2) Configure environment variables
- Copy `.env.example` to `.env` in `react_frontend/`
- Fill in the values from your Supabase project:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_KEY`

Example:
```env
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_KEY=YOUR_ANON_PUBLIC_KEY
```

Note: Do not commit your `.env` file.

### 3) Supabase client usage
The Supabase client is initialized in `src/lib/supabaseClient.js` as a singleton:

```js
import { getSupabaseClient } from './lib/supabaseClient';
const supabase = getSupabaseClient();
// Example:
const { data, error } = await supabase.from('tasks').select('*');
```

Note: Services should import the client using a relative path from their location. For example, from `src/services/taskService.js`:
```js
import { getSupabaseClient } from '../lib/supabaseClient';
```

This setup prepares the app to integrate full CRUD and real-time features later via:
- `supabase.from('tasks').select(...)`
- `supabase.from('tasks').insert([...])`
- `supabase.from('tasks').update({...}).eq('id', ...)`
- `supabase.from('tasks').delete().eq('id', ...)`
- Realtime: `supabase.channel(...).on('postgres_changes', ...).subscribe()`

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Theme and Ocean Professional Style

- The main brand colors are defined as CSS variables in `src/App.css`.
- To follow the "Ocean Professional" theme (blue & amber accents, rounded cards, modern look), use:
  - Primary: `#2563EB` (blue)
  - Secondary/Accent: `#F59E0B` (amber)
  - Background: `#f9fafb`
  - Surface: `#ffffff`
  - Text: `#111827`

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
