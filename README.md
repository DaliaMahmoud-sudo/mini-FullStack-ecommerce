# 🛒 Mini Full-Stack E-Commerce Platform

A simple full-stack e-commerce web application built using **Angular (Frontend)** and **.NET Web API (Backend)**.  
The project demonstrates CRUD operations, order management, product handling, and integration between frontend and backend APIs.

---

## 🚀 Live Demo

- Frontend (Vercel): https://mini-full-stack-ecommerce.vercel.app  
- Backend API (Local): https://localhost:7164  

⚠️ **Note:**  
Backend is running locally. Please run the .NET API before using the frontend.

---

## 🧩 Tech Stack

### Frontend
- Angular 20
- TypeScript
- Tailwind CSS
- RxJS
- Angular Forms
- ngx-toastr

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Repository Pattern
- RESTful APIs

---

## 📌 Features

### 🛍️ Products
- View all products
- Add new product
- Prevent duplicate product names (update instead)

### 📦 Orders
- Create order for a product
- Validate stock before ordering
- Automatic subtotal, discount, and final price calculation
- View all orders with full details

### 🔗 System Features
- REST API integration
- Real-time UI updates after actions
- Form validation (frontend + backend)
- Responsive UI design

---

## 📂 Project Structure

```text
mini-FullStack-ecommerce
│
├── Backend
│   ├── E-Commerce.APIs
│   ├── E-Commerce.Core
│   ├── E-Commerce.Repository
│
├── Frontend
│   ├── src/app
│   │   ├── core
│   │   ├── features
│   │   ├── layouts
│   │   ├── shared
```

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup (.NET API)

```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run
```

Make sure SQL Server is running and update the connection string in `appsettings.json`.

### 2️⃣ Frontend Setup (Angular)

```bash
cd Frontend
npm install
ng serve
```

App runs on:

```txt
http://localhost:4200
```

---

## 🔌 API Endpoints

### Products

```http
GET /api/products
```
Get all products

```http
GET /api/products/{id}
```
Get product by ID

```http
POST /api/products
```
Add product

### Orders

```http
GET /api/orders
```
Get all orders

```http
GET /api/orders/{id}
```
Get order by ID

```http
POST /api/orders
```
Create order

---

## 📊 Order Payload Example

```json
{
  "customerName": "Dalia",
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

---

## 🧠 Key Learnings

```txt
- Full-stack integration between Angular and .NET
- REST API design and consumption
- State management using Angular signals
- Form validation (template-driven + reactive forms)
- Handling stock & order logic in backend
- Deployment using Vercel
```

---

## 📌 Future Improvements

```txt
- Authentication & JWT security
- Admin dashboard
- Pagination & filtering
- Payment integration
- Real-time updates (SignalR)
```

---

## 👩‍💻 Author

```txt
Dalia Mahmoud

Full Stack Developer (Angular & .NET)
```
