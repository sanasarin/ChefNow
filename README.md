# 🍳 Easy Chef  
A Full-Stack Recipe Sharing Platform (HTML/CSS → Django → React)

Easy Chef is a multi-phase web application built to simulate a real, production-ready recipe-sharing platform.  
This project is designed around **user stories**, **clean UI/UX**, and **full-stack engineering**, progressing from static pages to a complete React + Django application.

---

## ✨ Overview

Easy Chef helps users create, discover, and interact with recipes in an intuitive and engaging way.  
The platform includes accounts, recipe creation, multimedia support, ingredient scaling, shopping lists, searching, filtering, ratings, comments, and recipe popularity tracking.

The project is developed in **three phases**:

1. **Phase 1:** Static HTML/CSS demo  
2. **Phase 2:** Django REST backend  
3. **Phase 3:** Full React frontend integrated with Django APIs  

---

## 👤 User Stories

### **Accounts**
- Users can sign up, log in, log out, and edit their profiles.  
- Profiles include: first name, last name, email, avatar, and phone number.

---

### **Recipes**
- Create recipes with:
  - Name  
  - Diet types (vegetarian, gluten-free, etc.)  
  - Cuisine  
  - Ingredients (name + quantity)  
  - Prep time & cooking time  
  - Steps (with optional photos/videos)  
- Create a recipe *based on* another recipe (prefilled fields).  
- Autocomplete suggestions when entering ingredients.  
- Edit or delete your recipes.  
- View detailed recipe pages showing:
  - Steps, ingredients, multimedia  
  - Total likes, rating summary  
  - Comments  
  - Base recipe (if any)  
- Dynamically adjust servings → ingredient amounts update automatically.  
- Generate a **combined shopping list** across multiple recipes.

---

### **Search**
- Search by recipe name, ingredients, or creator.  
- Filter by cuisine, diet, or cooking time.  
- Sort results using a mix of rating + number of favorites.

---

### **Social Features**
- Rate recipes (1–5 stars) and update ratings.  
- Mark/unmark recipes as favorites.  
- Comment with optional images/videos.  
- View:
  - Recipes you created  
  - Your favorites  
  - All recipes you interacted with (liked, rated, commented, created)  
- Browse popular recipes based on ratings or favorites.

---

## 🧱 Phase 1 – Static HTML/CSS Demo

Phase 1 delivers a **fully navigable static prototype**, with no backend or JavaScript logic (except external JS libraries).

**Requirements:**
- HTML + CSS only (frameworks allowed: **Bootstrap, Bulma, Semantic UI**, etc.)
- A clean, polished UI with strong UX and page navigation
- Static versions of:
  - Home page with search bar, filters, and popular recipes  
  - Recipe cards  
  - Recipe details page  
  - Recipe creation form  
  - Profile edit page  
  - My recipes page  
  - Shopping list page  
- Functional navbar linking all major pages

This phase is primarily graded on **UI/UX quality**.

---

## 🐍 Phase 2 – Django REST Backend

In Phase 2, Easy Chef becomes a **fully functional backend** using Django + DRF.

**Core Requirements:**
- Django project running in a virtual environment  
- Custom User model (recommended)  
- Token authentication required for all API interactions  
- REST APIs covering all user stories  
- Paginated endpoints for long lists (search results, popular recipes, etc.)  
- Backend-powered ingredient autocomplete  
- No HTML templates or frontend logic returned—API only

This phase establishes the full data and logic layer for the app.

---

## ⚛️ Phase 3 – React Frontend + Integration

Phase 3 brings the platform to life with a complete **React single-page application** connected to the Django backend.

**Deliverables:**
- Fully functional, shippable website  
- Polished UI/UX with smooth navigation, reusable components, and clean state management  
- Frontend validation, error handling, asynchronous requests  
- Proper React routing (browser URLs for each page)  
- Pre-populated database with **10–20 meaningful recipes** including:
  - Realistic ingredients  
  - Photos  
  - Comments  
  - Cuisines + diets  

This phase is evaluated like a real-world software delivery, emphasizing:
- Completeness  
- Bug-free UX  
- Aesthetic and intuitive UI  

---


---

## 🛠️ Technologies

### **Phase 1**
- HTML5  
- CSS3 (Bootstrap/Bulma recommended)

### **Phase 2**
- Django  
- Django REST Framework  
- SQLite / PostgreSQL  
- Token Authentication

### **Phase 3**
- React  
- React Router  
- Axios / Fetch  
- Modern UI components & responsive design

---

## ⭐ Notes & Expectations

- UX matters **a lot** in every phase.  
- Pages must be beautiful, intuitive, and fully navigable.  
- At Phase 3, the site must feel like a real commercial product.  
- Preloaded recipe data should be meaningful and presentation-ready.  

---

If you found this helpful, leave a ⭐ on the repo!

