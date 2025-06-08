## Profico task - News app

The profico task given after the intial screening interview.

## MyNews

Here is some basic info about the project and instructions on how to use the app.

### Folder structure - Backend

```
backend/
├── src/                           # Main source code directory
│   ├── auth/                      # Authentication module
│   │   ├── decorators/            # Custom decorators for auth
│   │   ├── dtos/                  # Data Transfer Objects for auth
│   │   ├── guards/                # Authentication guards
│   │   ├── strategies/            # Passport strategies
│   │   ├── auth.controller.ts     # Auth endpoints controller
│   │   ├── auth.module.ts         # Auth module configuration
│   │   └── auth.service.ts        # Auth business logic
│   ├── users/                     # User management module
│   │   ├── dtos/                  # DTOs for user operations
│   │   ├── users.controller.ts    # User endpoints controller
│   │   ├── users.module.ts        # User module configuration
│   │   └── users.service.ts       # User business logic
│   ├── news/                      # News module
│   │   ├── news.controller.ts     # News endpoints controller
│   │   ├── news.module.ts         # News module configuration
│   │   └── news.service.ts        # News API integration logic
│   ├── email/                     # Email service module
│   │   ├── email.module.ts        # Email module configuration
│   │   └── email.service.ts       # Email sending logic
│   ├── prisma/                    # Prisma database service
│   ├── exceptions/                # Custom exception handling
│   │   ├── business-error.ts      # Custom business error class
│   │   ├── business-error-filter.ts # Global exception filter
│   │   └── index.ts               # Exception exports
│   ├── app.controller.ts          # Root application controller
│   ├── app.module.ts              # Main application module
│   ├── app.service.ts             # Root application service
│   └── main.ts                    # Application entry point
├── prisma/                        # Database schema and migrations
│   ├── migrations/                # Database migration files
│   └── schema.prisma              # Prisma database schema
├── test/                          # End-to-end tests
│   ├── app.e2e-spec.ts            # E2E test specifications
│   └── jest-e2e.json              # Jest E2E configuration
├── types/                         # TypeScript type definitions
│   └── express.d.ts               # Express type extensions
├── utils/                         # Utility functions
│   └── token.ts                   # Token utility functions
├── nest-cli.json                  # NestJS CLI configuration
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.build.json            # TypeScript build configuration
```

### Folder structure - Frontend

```
frontend/
├── src/                           # Main source code directory
│   ├── app/                       # Next.js App Router directory
│   │   ├── (auth)/                # Auth route group
│   │   ├── (main)/                # Main app route group
│   │   ├── layout.tsx             # Root layout component
│   │   ├── globals.css            # Global CSS styles
│   │   ├── fonts.ts               # Font configurations
│   │   ├── App.tsx                # Main app component
│   │   └── favicon.ico            # Site favicon
│   ├── components/                # Reusable UI components
│   ├── features/                  # Page components for each page in app directory
│   ├── shared/                    # Shared utilities and configurations
│   ├── api/                       # API files - React query hooks, requests and request builder
│   ├── assets/                    # Static assets
│   ├── interfaces/                # TypeScript interfaces
│   ├── metadata/                  # SEO metadata
│   └── middleware.ts              # Next.js middleware
├── public/                        # Static public assets
├── .next/                         # Next.js build output
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── Dockerfile.master              # Docker configuration
├── next.config.mjs                # Next.js configuration
├── next-env.d.ts                  # Next.js TypeScript definitions
├── package.json                   # Project dependencies
├── postcss.config.js              # PostCSS configuration
├── sentry.client.config.ts        # Sentry client config
├── sentry.edge.config.ts          # Sentry edge config
├── sentry.server.config.ts        # Sentry server config
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
```

## Setup

### Backend setup

First you need to prepare all env variables for backend to function properly.

Here is .env file example

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/db_name
PORT=3002
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=SG.........
FRONTEND_URL=http://localhost:3000
NEWS_API_KEY=NEWS_API_KEY
```

Install dependecies and run the app

```
cd backend
npm install
npm run start:dev
```

View backend swagger docs

```
http://localhost:3002/api
```

### Frontend setup

Next step is setting up the frontend. You also need to provide .env file for it.

Here is .env file example

```
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyNews

# api

NEXT_PUBLIC_API_URL=http://localhost:3002

# sentry

NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_ENV=
```

Install dependecies and run the app

```
cd frontend
npm install
npm run dev
```

## How to use the app

<p>This app is a small simulation of a news application, utilizing the News API to fetch the latest news articles. It organizes the news into various categories and sorts them by recency. Users have the option to bookmark articles, which will then appear under the Favourites category. The app features a menu for selecting the desired news category, an article feed displaying the most recent relevant articles, and a latest news feed that presents news for the selected category in chronological order. To access the news articles, users are required to create an account, confirm their email, and log in.</p>

### Tecnology used

<p>Frontend -> Next.js, tailwind css, react query</p>
<p>Backend -> Nest.js</p>
<p>Database -> PostgreSQL</p>

### Design decisions and differences

For this app we were actually given the full desktop and mobile design made in figma.

I believe that the large majority of the app is in accordance with the deisgn, and that the only real differences are most likely small innacurracies in some values (such as color or margins or a missing box shadow).

One change that is made to design is category display in article card. Design specified to show category of article but news api doesnt return category with each article so it display source from where the news came from (bbc, google news, new york times, ect.)

#### Bookmark Design Decision

As part of the task requirements, we needed to implement a way to bookmark articles and provide them with a dedicated space. Here's how the bookmarking feature was designed:

**Implementation Approach:**

- Added a small bookmark icon (star) positioned to the right of article titles
- Added bookmark icon to the sidebar, treating bookmarks as a standard category

### Disclaimers

#### News API Limitations

**Important Notice:** If you encounter errors such as:

- `upgrade required`
- `too many requests`

These errors are due to limitations imposed by the News API service. The application uses a developer account which has certain restrictions:

- **Article Limit**: The latest news component can fetch a maximum of 100 articles
- **Rate Limiting**: After reaching the limit, the API returns errors indicating that developer accounts cannot fetch more than 100 articles
- **Request Quotas**: Daily/hourly request limits may apply

These limitations are inherent to the free tier of the News API and are not issues with the application code itself.

#### Latest News Fetch Limitations

Latest news part returns only news from yesterday because of News API limitations.

#### Email Delivery Notice

**Spam Folder Warning:** For some reason, SendGrid emails may be reported as spam despite having verified domain and sender authentication.

**Action Required:** Please check your spam/junk folder if you don't receive:

- Email verification messages
- Password reset emails
