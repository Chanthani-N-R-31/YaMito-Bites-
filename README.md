# 🧇 YaMito Bites — Official Animated Restaurant & Cafe Website
**BTM Layout 2nd Stage, Bangalore**

A modern, high-conversion animated cafe website built for **YaMito Bites**, featuring hand-crafted Belgian waffles, chewy artisanal Boba (bubble tea), loaded fries, and gourmet burgers.

---

## 🌟 Features Included

1. **Brand Aesthetic & Warm Midnight Theme**:
   - Deep obsidian background (`#0A0A0F`), warm amber glow (`#F59E0B`), and Belgian chocolate accents.
   - Glassmorphism navigation with scroll detection and live Bangalore IST status indicator (*"🟢 Open Now • Closes 1:00 AM"*).
   - High-resolution curated foodie imagery with smooth transitions.

2. **Ultra-Smooth Animations & Interactions**:
   - **Hero Section**: 3D-feel featured card switcher, glowing ambient halos, and quick CTA buttons.
   - **Endless Marquee Ribbon**: Looping badges showcasing fresh waffles, boba, Google ratings, and late-night kitchen hours.
   - **Signature Spotlight**: Interactive tabs exploring artisanal waffles, Taiwanese boba, and savory night munchies.
   - **Interactive Menu**:
     - Category filter pills (Waffles, Boba, Burgers, Fries, Shakes, Mojitos).
     - Dietary tags: *Pure Veg 🌱*, *Non-Veg 🍗*, *Bestsellers 🔥*, *Chef's Picks ⭐*.
     - Instant search bar with clear button.
     - Price sorting (Low to High / High to Low).
   - **Customization Modal & Confetti Blast**:
     - Waffle toppings (extra Nutella, roasted almonds, brownie chunks, vanilla scoops).
     - Boba preferences (sweetness level 50%/75%/100%, ice level).
     - Confetti animation powered by `canvas-confetti`.

3. **Ordering System**:
   - **Direct WhatsApp Ordering**: Automatically formats a complete order summary (items, add-ons, subtotal, discount, customer address, payment method) and opens direct WhatsApp chat with YaMito Bites (+91 88849 43237).
   - **Coupon System**: Supports discount codes like `YAMITO10` (10% OFF) and `SWEETDEAL`.
   - **Third-Party Delivery Links**: Direct integration with Zomato and Swiggy BTM listings.

4. **Table & Party Reservation**:
   - Form with party size, preferred time slot (afternoon to 12:30 AM midnight), occasion, and notes.
   - Direct WhatsApp confirmation button.

5. **Location, Reviews & Social Proof**:
   - 4.9 ⭐ Google & Zomato rating showcase with authentic testimonials.
   - Interactive embedded dark-themed Google Maps with one-click directions to 18th Main, BTM 2nd Stage.
   - Copyable address & one-tap direct phone call buttons.
   - Interactive FAQ accordion.

---

## 🚀 How to Host on Vercel or Netlify

### Option 1: Deploy to Vercel (Recommended)

#### Method A: Via GitHub (Continuous Deployment)
1. Push this folder to a GitHub repository:
   ```bash
   cd yamito-bites
   git init
   git add .
   git commit -m "Initial commit for YaMito Bites website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select your GitHub repository.
4. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"** — Your website is live in ~30 seconds with free SSL!

#### Method B: Via Vercel CLI
```bash
cd yamito-bites
npx vercel
```
Follow the interactive prompts (Accept defaults by pressing Enter).

---

### Option 2: Deploy to Netlify

#### Method A: Drag & Drop (Zero Setup)
1. Run the production build command:
   ```bash
   cd yamito-bites
   npm run build
   ```
2. Log in to [netlify.com](https://app.netlify.com).
3. Navigate to **Sites** and drag & drop the `dist` folder into the dropzone.
4. Your site is instantly live with a Netlify URL!

#### Method B: Via GitHub
1. Connect your repository on Netlify.
2. Netlify will read `netlify.toml` automatically:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click **"Deploy Site"**.

---

## 💻 Local Development
```bash
# Navigate to directory
cd yamito-bites

# Install dependencies
npm install

# Start development server
npm run dev
```
Open `http://localhost:5173` in your browser.
