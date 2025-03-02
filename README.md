# 🚀 Devium – Interactive Code Editor  

Devium is a **real-time, interactive code editor** that allows users to write, execute, and share code in **up to 10 languages**. It offers a **free tier (1 language)** and a **Pro version (10 languages)** with premium features. The platform supports **Monaco Editor, Piston API for execution, real-time collaboration, and a user profile dashboard** for tracking stats.  

🔗 **Live Site:** [Devium](https://devium-nine.vercel.app/)  
📂 **Source Code:** [GitHub](https://github.com/EcstaticFly/Devium)  

## ✨ Features  
- **🖥️ Multi-Language Support** – Execute code in up to **10 programming languages**.  
- **💾 Real-Time Database** – Uses **Convex** for seamless data storage.  
- **💡 Code Sharing & Collaboration** – Users can **share, star, and comment** on code snippets.  
- **📊 User Dashboard** – View **execution stats, most used languages, and total starred snippets**.  
- **🎨 Customizable Themes** – Choose from different themes for a **personalized coding experience**.  
- **💳 Subscription Model** – Free tier (1 language), Pro version (10 languages) via **LemonSqueezy payments**.  
- **🐳 Containerized with Docker** – Ensures **scalability and easy deployment**.  

## 🛠 Tech Stack  
- **Frontend:** Next.js, TypeScript, TailwindCSS  
- **Auth & Payments:** Clerk, LemonSqueezy  
- **Database:** Convex (real-time)  
- **Code Execution:** Monaco Editor, Piston API  
- **Deployment:** Docker  

## 🚀 Installation & Setup  
1️⃣ **Clone the repository:**  
   ```bash
   git clone https://github.com/EcstaticFly/Devium.git
   cd Devium
   ```
2️⃣ **Configure environment variables:**
```bash
touch .env.local

#setup .env.local file:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CHECKOUT_URL=your_lemonsqueezy_checkout_url
PAYMENT_WEBHOOK_SIGNING_SECRET=your_lemonsqueezy_webhook_secret
```

3️⃣ **Run Docker Command:**
```bash
#To start Devium
docker compose up --build -d

#if already built once
docker compose up -d

#To stop Devium
docker compose down
```

4️⃣ **The app will be live at http://localhost:3000** 

## 🤝 Contributing  
Contributions, issues, and feature requests are welcome!  
Feel free to **fork** the repo and submit a **pull request**.  

## 📜 License  
This project is licensed under the **GNU GENERAL PUBLIC LICENSE v3**.