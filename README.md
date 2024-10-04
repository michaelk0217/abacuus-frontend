This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Abacuus Web App

This project is a web app for the Abacuus platform. This repository is for the frontend of the Abacuus application.
The backend is hosted on AWS, implemented with Django rest framework.

## Getting Started

1. Clone the repository

2. Run `npm install` to install the dependencies

3. Set up environment variables for the backend api url, auth secret, and Google OAuth credentials

4. Run `npm run dev` to start the development server

## Change log

### 10/03/24

- Finished landing page ui
- Used several shadcn/ui and magicui components

### 10/02/24

- Restructured project to have the main app have url that begins with /dashboard
- Implemented initial landing page ui
- Testing landing pagemobile showcase section

### 10/01/24

- Implemented symbol info details page
- Used eCharts for candlestick chart

### 09/29/24

- Updated dashboard ui
- Used Material UI components

### 09/27/24

- Redesigned user authentication method
- Used auth.js library for session management

### 09/25/24

- Implemented OAuth authentication pipelined to Google Credentials

### 09/23/24

- Updated django backend to latest
- Fixed psql bugs
- Authentication now supports email

### 09/22/24

- Toolpad core material ui debugging

### 09/21/24

- Dashboard edit list modal ui function implemented
- Exploring toolpad core by Material UI. Created new repo for it

### 09/19/24

- Interval info cells implemented

### 09/18/24

- Radix navbar implementation
- Ui update with candlechart for dashboard

### 09/17/24

- Typescript refactoring
- Experimenting with radix-ui

### 09/16/24

- Css style changes
- Deciding to refactor whole project into typescript

### 09/15/24

- Volume guage implementation
- Volume spike algorithm change

### 09/14/24

- Custom apiGetCall implementation
- Modularized fav symbol list
- Cleaning up code
- Updated favsymbolcell ui

### 09/13/24

- Token refresher bug fix

### 09/12/24

- Custom api request function with token refresher

### 09/11/24

- Initial version of styled fav symbol list
- Implemented 5s interval for updating symbol list

### 09/10/24

- Temporary logout button created
- UseAuth custom hook for requiring authentication and permissions

### 09/09/24

- Initial commit
- Pages and fist authentication setup
- Basic n2avigation setup
### TEST
