# 🚀 Dev Stack

**Dev Stack** is a modern web application that helps developers discover and build their ideal technology stack. Browse curated tools and technologies, add them to your personal stack with a single click, and manage everything in a clean, interactive interface.

---

## 🛠️ Technology Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **react-toastify**

---

## ✨ Features

1. **Interactive Technology Cards**  
   Browse a collection of popular technologies loaded from a JSON file. Each card shows icon, category, rating, difficulty, and description.

2. **Personal Stack Builder**  
   Click “Add to Stack” to collect technologies. You can only add each item once. The right-side panel shows your current stack with the ability to remove individual items or clear everything.

3. **Responsive Design + Mobile Menu**  
   Fully responsive layout with a hamburger menu for mobile devices, sticky stack panel, and modern UI.

---

## 📸 Preview

*(Add screenshots of your app here later)*

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:3000 in your browser.

❓ React Questions & Answers
1. What is JSX, and why is it used in React?
JSX is a syntax that can made us possible to write html in the javascript file.

2. What is the difference between props and state?
props is a data that pass parent to childre.
state is data that stay in the container and change value

3. What does the useState hook do, and where did you use it in this project?
useState lets a component remember and update values.

In this project I used it for:

technologies (list of tech cards)
stack (selected technologies)
loading (loading state)
isOpen (hamburger menu open/close)

4. What does the useEffect hook do, and why did you need it to load the JSON data?
useEffect runs code after the component renders.

I used it to fetch the technologies JSON file when the page first loads, because fetching data is a side effect that should not happen during render.
5. Why does every item in a .map() list need a unique key prop?
React needs a unique key so it can efficiently track which items changed, were added, or removed. Without unique keys, React may re-render incorrectly or show bugs.
6. What is conditional rendering? Show one place you used it.
Conditional rendering means showing different UI based on a condition.

Example in this project: when the stack is empty, we show the message “Your Stack is empty”. When it has items, we show the list of selected technologies.
7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?

Parent → Child: Pass data using props.
Child → Parent: Pass a function as a prop. The child calls that function to send data or trigger an action in the parent.