# Enterprise Java Applications

A full-stack **Enterprise Java Web Application** built using **Spring Boot, React, TypeScript, REST API, Spring Security, and MySQL**.

The project demonstrates enterprise-level application development with a separate frontend and backend, secure authentication, database connectivity, CRUD operations, RESTful APIs, and a scalable layered architecture.

---

## 🚀 Project Overview

**Enterprise Java Applications** is designed as a modern full-stack enterprise management system.

The application provides:

* User registration and login
* Secure authentication
* Role-based access
* CRUD operations
* REST APIs
* MySQL database integration
* Employee/user management
* Responsive frontend
* Backend validation
* Exception handling
* API documentation

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* HTML5
* CSS3
* JavaScript
* Responsive UI

### Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Security
* JWT Authentication
* Maven

### Database

* MySQL 8

### Development Tools

* Visual Studio Code / IntelliJ IDEA
* MySQL Workbench
* Postman
* Git
* GitHub

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │ TypeScript + Vite   │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    ├─────────────────────┤
                    │ Controllers         │
                    │ Services            │
                    │ Security            │
                    │ Validation          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Spring Data JPA     │
                    │ Hibernate ORM       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MySQL          │
                    │     Database        │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
Enterprise-Java-applications/
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── enterprise/
│   │   │   │           ├── config/
│   │   │   │           ├── controller/
│   │   │   │           ├── dto/
│   │   │   │           ├── entity/
│   │   │   │           ├── repository/
│   │   │   │           ├── security/
│   │   │   │           ├── service/
│   │   │   │           ├── exception/
│   │   │   │           └── EnterpriseApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── database/
│   └── schema.sql
│
├── docs/
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

# 🔐 Authentication & Security

The application uses **Spring Security** for authentication and authorization.

Security features include:

* User registration
* User login
* JWT authentication
* Password encryption
* BCrypt password hashing
* Role-based authorization
* Protected REST endpoints
* CORS configuration
* Token validation
* Logout

### User Roles

```text
ADMIN
MANAGER
EMPLOYEE
USER
```

Example permissions:

```text
ADMIN
 ├── Manage Users
 ├── Manage Employees
 ├── Manage Departments
 └── View Reports

MANAGER
 ├── Manage Employees
 └── View Reports

EMPLOYEE
 └── View Own Profile

USER
 └── Basic Dashboard
```

---

# 👨‍💼 Employee Management

The employee module supports complete CRUD operations.

Employee information can include:

```text
Employee ID
First Name
Last Name
Email
Phone
Address
Gender
Date of Birth
Department
Designation
Joining Date
Salary
Status
Created Date
Updated Date
```

Operations:

```text
CREATE
READ
UPDATE
DELETE
SEARCH
FILTER
```

---

# 👥 User Management

Administrators can:

* Create users
* View users
* Update users
* Delete users
* Search users
* Activate/deactivate accounts
* Assign roles
* Reset passwords

---

# 🏢 Department Management

Department management provides:

* Create department
* View department
* Update department
* Delete department
* Search department
* Assign employees

---

# 🌐 REST API

The backend provides RESTful APIs.

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Users

```http
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### Employees

```http
GET    /api/employees
GET    /api/employees/{id}
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}
```

### Departments

```http
GET    /api/departments
GET    /api/departments/{id}
POST   /api/departments
PUT    /api/departments/{id}
DELETE /api/departments/{id}
```

---

# 🗄️ Database

The application uses **MySQL** with Spring Data JPA and Hibernate.

Main tables:

```text
users
roles
user_roles
employees
departments
audit_logs
notifications
```

Relationships:

```text
Department
     │
     │ 1
     │
     │ N
     ▼
Employees


Users
  │
  │ N
  │
  │ N
  ▼
Roles
```

---

# ⚙️ Backend Setup

## 1. Clone Repository

```bash
git clone https://github.com/iamaryan7/Enterprise-Java-applications.git
```

```bash
cd Enterprise-Java-applications
```

---

## 2. Create MySQL Database

Open MySQL and execute:

```sql
CREATE DATABASE enterprise_java;
```

Then configure the database in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/enterprise_java
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Never commit real database passwords to GitHub.

---

# ▶️ Run Spring Boot Backend

Navigate to:

```bash
cd backend
```

Run:

```bash
mvn clean install
```

Then:

```bash
mvn spring-boot:run
```

Backend will run at:

```text
http://localhost:8080
```

---

# 💻 Run Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Frontend → Backend

Configure the frontend API URL:

```text
http://localhost:8080/api
```

Example API request:

```typescript
const response = await fetch(
  "http://localhost:8080/api/employees"
);

const employees = await response.json();
```

---

# 📚 API Documentation

Swagger/OpenAPI can be accessed through:

```text
http://localhost:8080/swagger-ui/index.html
```

Swagger provides interactive documentation for the REST APIs.

---

# 🧪 Testing

The project supports:

### Backend

* JUnit 5
* Mockito
* Spring Boot Test
* Integration testing

Run tests:

```bash
mvn test
```

### API Testing

Use:

```text
Postman
```

Test:

* Registration
* Login
* JWT authentication
* User CRUD
* Employee CRUD
* Department CRUD
* Authorization

---

# 🐳 Docker

The project can be containerized using Docker.

Build:

```bash
docker compose build
```

Start:

```bash
docker compose up
```

Stop:

```bash
docker compose down
```

---

# 📊 Main Features

| Feature             | Status |
| ------------------- | ------ |
| React Frontend      | ✅      |
| Spring Boot Backend | ✅      |
| MySQL Database      | ✅      |
| REST API            | ✅      |
| Login               | ✅      |
| JWT Authentication  | ✅      |
| Role-Based Access   | ✅      |
| User CRUD           | ✅      |
| Employee CRUD       | ✅      |
| Department CRUD     | ✅      |
| Validation          | ✅      |
| Exception Handling  | ✅      |
| Swagger             | ✅      |
| Unit Testing        | ✅      |
| Docker              | ✅      |
| Responsive UI       | ✅      |

---

# 🔮 Future Enhancements

Possible future improvements:

* Email notifications
* Advanced reporting
* PDF reports
* Excel export
* Cloud deployment
* Admin analytics
* Attendance management
* Payroll management
* Online database backup
* Real-time notifications
* Mobile application
* CI/CD pipeline

---

# 🎓 Academic Project

This project demonstrates concepts related to:

* Enterprise Java
* Spring Boot
* Spring MVC
* RESTful Web Services
* Spring Security
* JPA
* Hibernate
* MySQL
* React
* TypeScript
* Software architecture
* Database management
* API development

---

# 👨‍💻 Author

**Aryan**

GitHub:

https://github.com/iamaryan7

Project:

https://github.com/iamaryan7/Enterprise-Java-applications

---

# 📄 License

This project is intended for educational and development purposes.

---

## ⭐ Support

If this project helped you, consider giving the repository a ⭐ on GitHub.
