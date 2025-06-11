# CRUD Application

This is a recruitment task submission for Runwell.  
It’s a simple, fully functional **CRUD** (Create, Read, Update, Delete) app built with modern web technologies.

##  Features

- Create, update, and delete messages
- React Query for efficient state and API caching
- Tailwind CSS for modern, responsive styling
- TypeScript for full type safety
- Edits are instant, deletes are immediate
- Validations: title and description required

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React Query](https://tanstack.com/query)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [UUID](https://www.npmjs.com/package/uuid)

---

## 🛠 How to Run It

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Visit the app
http://localhost:3000

runwell-crud/
├── lib/
│   └── posts.ts        # Post logic & in-memory DB
├── pages/
│   ├── index.tsx       # Main UI
│   └── _app.tsx        # App wrapper with QueryClientProvider
├── styles/
│   └── globals.css     # Tailwind base styles
├── tailwind.config.js
└── tsconfig.json

All data is stored in memory
