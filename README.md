# 💸 Financial Manager

A modern web application to track your personal finances, monitor spending, and stay on top of your budget.  
Built with Vue 3, TypeScript, and Vite for speed, simplicity, and scalability.

GitHub Pages: https://ivanmw97.github.io/financial-manager

---

## ✨ Features

- Dashboard with real-time financial overview
- Add, edit, and delete transactions
- Budget management with goals and limits
- Monthly tracking with categorized summaries
- Visual charts and statistics
- Supabase integration (for auth & data storage)

---

## 🧰 Tech Stack

- Vue 3 + Vite
- TypeScript
- Tailwind CSS
- Pinia (state management)
- Supabase (backend)
- Vitest + ESLint (testing & linting)

---

## 🚀 Getting Started

1. **Clone the repo**:
   
   ```bash
   git clone https://github.com/Ivanmw97/financial-manager.git
   cd financial-manager
   ```
2. **Install dependencies**:
   
   ```bash
   npm install
   ```
3. **Run the app**:
   
   ```bash
   npm run dev
   ```

---

## 🌳 Branch Strategy

This project uses a simplified Git flow:

| Branch    | Purpose                          |
|-----------|----------------------------------|
| develop   | Active development branch        |
| release   | Production-ready, auto-deployed  |

All changes are pushed or merged into `develop` and promoted to `release` via pull requests when stable.

---

## 🧪 CI/CD & Deployment

- All pull requests run CI checks (type-check, lint, test)
- On successful push or PR to `release`, the app is built and automatically deployed to GitHub Pages

URL: https://ivanmw97.github.io/financial-manager

---

## 🤝 Contributing

Contributions are welcome!  
Fork this repo, create a feature branch, and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
