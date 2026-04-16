# Taskmaster

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A full-stack task management web application designed to help users organize their daily tasks efficiently.

##  Preview
![img_1.png](img_1.png)
##  Features
The application provides a clean interface with full CRUD (Create, Read, Update, Delete) functionality:
* **View Tasks:** A clear, organized list of all active tasks.
* **Add Tasks:** Quickly create new items for the to-do list.
* **Edit Tasks:** Update task details or change their status.
* **Delete Tasks:** Remove completed or unnecessary tasks from the list.

##  Tech Stack
* **Frontend:** Angular, TypeScript, HTML/CSS
* **Backend:** Java, Spring Boot, Spring Data JPA, REST API
* **Database:** PostgreSQL
* **Infrastructure:** Docker & Docker Compose

##  How to Run Locally

### Prerequisites
Make sure you have installed:
- [Docker](https://www.docker.com/) (for running the database)
- [Java 17+](https://www.oracle.com/java/)
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### 1. Clone the repository
```bash
git clone [https://github.com/](https://github.com/)[AkeehRRR]/taskmaster.git
cd taskmaster

````md
# Project Setup

## Start the PostgreSQL Database

The project uses Docker Compose to set up the database quickly. Run the following command in the root directory:

```bash
docker-compose up -d
````

## 2. Run the Backend (Spring Boot)

Open a terminal, navigate to the backend directory, and start the application:

```bash
cd backend
./gradlew bootRun
```

The backend REST API will be available at [http://localhost:8080](http://localhost:8080).

## 3. Run the Frontend (Angular)

Open a new terminal, navigate to the frontend directory, install dependencies, and start the dev server:

```bash
cd taskmaster-frontend
npm install
ng serve
```

Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to see the app running.