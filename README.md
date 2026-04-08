# 101504750-lab-test2-comp3133

Harry Potter Theme Angular HTTP Client application for COMP3133 Lab Test 2.

## Features
- Fetches all Harry Potter characters from the HP API
- Displays characters in a responsive Angular Material card grid
- Filters characters by Hogwarts house with a dropdown
- Shows full character details on a separate page
- Uses Angular HttpClient, FormsModule, ReactiveFormsModule, Signals, `@for`, `@if`, and `@switch`

## API Endpoints
- All characters: `https://hp-api.onrender.com/api/characters`
- Characters by house: `https://hp-api.onrender.com/api/characters/house/:house`
- Character details: `https://hp-api.onrender.com/api/character/:id`

## Run locally
```bash
npm install
ng serve
```
Then open `http://localhost:4200`

## Suggested screenshots for submission
1. Character list page running in browser
2. House filter page with dropdown results
3. Character details page
4. Code screenshots for service, model, and components

## Deployment
You can deploy this Angular app to Vercel or Render after pushing it to GitHub.
