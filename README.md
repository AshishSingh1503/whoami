# Ashish Singh - DevOps & Cloud Engineer Portfolio

A modern, dark-themed portfolio website showcasing DevOps and Cloud Engineering projects.

## 🚀 Features

- Modern dark theme with blue and purple accents
- Animated scroll reveals (AOS)
- Typing animation for tech stack
- Floating DevOps icons
- Responsive design
- Project showcase with tech stack tags
- Learning timeline
- Contact section

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript
- AOS (Animate On Scroll)
- Typed.js

## 📦 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `portfolio`
3. Keep it public
4. Don't initialize with README (we already have files)

### Step 2: Push Your Code

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/AshishSingh1503/portfolio.git
git push -u origin main
```

### Step 3: Configure Custom Domain on GoDaddy

#### DNS Settings in GoDaddy:

1. Log in to your GoDaddy account
2. Go to **My Products** → **DNS** for `ashishsingh.live`
3. Add/Update these DNS records:

**A Records (for apex domain):**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600 seconds

Type: A
Name: @
Value: 185.199.109.153
TTL: 600 seconds

Type: A
Name: @
Value: 185.199.110.153
TTL: 600 seconds

Type: A
Name: @
Value: 185.199.111.153
TTL: 600 seconds
```

**CNAME Record (for www subdomain):**
```
Type: CNAME
Name: www
Value: AshishSingh1503.github.io
TTL: 600 seconds
```

4. Save all DNS records
5. Wait 10-30 minutes for DNS propagation

### Step 4: Enable GitHub Pages with Custom Domain

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Under **Custom domain**, enter: `ashishsingh.live`
5. Click **Save**
6. Wait for DNS check to complete
7. Enable **Enforce HTTPS** (after DNS verification)

### Step 5: Access Your Portfolio

Your portfolio will be live at:
- `https://ashishsingh.live/`
- `https://www.ashishsingh.live/`

## 🔄 Auto-Deployment

Every time you push to the `main` branch, GitHub Actions will automatically deploy your changes!

## 📝 Customization

- Update your information in `index.html`
- Modify colors in `css/style.css`
- Add your profile image to `images/profile.jpg`
- Replace `Ashish_Singh (2).pdf` with your resume

## 📧 Contact

- Email: singhashish150305@gmail.com
- LinkedIn: [ashish-singh-70b7082a0](https://www.linkedin.com/in/ashish-singh-70b7082a0/)
- GitHub: [AshishSingh1503](https://github.com/AshishSingh1503)

---

Built with ❤️ by Ashish Singh
