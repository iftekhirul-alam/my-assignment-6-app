# Fitlog: Interactive Web App for Workout

**A short note about the project**: Fitlog is an intuitive, high-performance fitness companion built with Next.js App Router and Tailwind CSS. It empowers users to explore curated exercise routines, build customized daily training plans, track performance metrics like burned calories and duration, and seamlessly manage saved workouts with real-time feedback notifications.


## 🚀 Key Features

* **Dynamic Workout Exploration**: Browse a comprehensive catalog of routines fetched dynamically from a secure worker API.
* **Detailed Exercise Views**: Dive deep into each exercise with high-resolution imagery, muscle group tags, equipment details, difficulty ratings, calorie burn, and step-by-step instructions.
* **Global State Management**: Powered by React Context (`WorkoutsProvider`) to seamlessly track and sync your active plan and saved lists across pages.
* **Interactive "My Plan" Dashboard**: 
  * Real-time calculation of total exercise counts, total duration (minutes), and total calories burned.
  * Sort routines dynamically by duration, calories, or user rating.
  * Toggle items between "Today's Plan" and "Saved for Later".
* **Toast Notifications**: Instant feedback alerts using `react-hot-toast` whenever routines are added, removed, or completed.
* **Fully Responsive & Dark-Themed**: Built with a sleek, modern dark mode aesthetic optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Library**: [React](https://react.dev/) (React 19)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
* **API Source**: Cloudflare Worker REST API (`https://api.abcz.workers.dev/api/fitlog`)

---

## 📁 Project Structure

```text
my-a06-app/
├── app/
│   ├── context/
│   │   └── WorkoutsContext.tsx   # Global state provider for Plan & Saved items
│   ├── my-plan/
│   │   └── page.tsx              # Interactive dashboard for plan management & sorting
│   ├── workout/
│   │   └── [slug]/
│   │       ├── page.tsx          # Server component for single workout data fetching
│   │       └── WorkoutDetailsClient.tsx # Client component for details & context interactions
│   ├── globals.css               # Global styles and Tailwind directives
│   ├── layout.tsx                # Root layout wrapping providers, Navbar, and Toaster
│   └── page.tsx                  # Homepage route
├── components/
│   ├── Homepage/                 # Banner and workout feed components
│   ├── Navbar.tsx                # Global navigation with live state badges
│   └── Footer.tsx                # Site footer
└── types/                        # TypeScript interfaces for workout objects