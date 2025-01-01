### **Başlık**
`Nuxt.js Frontend with Keycloak Integration`

---

### **README.md**

```markdown
## Nuxt.js Frontend with Keycloak Integration

This project is a **Nuxt.js** frontend that integrates with **Keycloak Identity Server** for secure authentication and role-based access. It interacts with the [ASP.NET Core Web API with Keycloak Integration](https://github.com/yunuspektass/ASP.NET-Core-Web-API-Keycloak-Integration) backend.

### Features
- **Authentication**: Secure login using Keycloak.
- **Protected Routes**: Role-based access control for frontend routes.
- **API Integration**: Seamless interaction with the backend API.

### Technologies
- **Nuxt.js** (Frontend Framework)
- **Vuetify** (Material Design Component Framework)
- **Keycloak** (Identity Server)
- **Axios** (For API requests)

### How to Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yunuspektass/Nuxt-Frontend-Keycloak-Integration.git
   ```
2. **Set Up Keycloak**:
   - Install and configure Keycloak (local or remote).
   - Create a realm, client, and roles in Keycloak.
   - Update the Keycloak configuration in `nuxt.config.js`:
     ```javascript
     keycloak: {
       realm: 'your-realm',
       url: 'https://your-keycloak-server/auth',
       clientId: 'your-client-id'
     }
     ```
3. **Run the Project**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the project:
     ```bash
     npm run dev
     ```

### Example Pages
- **Login**: `/login` - Secure login using Keycloak.
- **Dashboard**: `/dashboard` - Display user information and roles.
- **Protected Page**: `/protected` - Accessible only to authorized users.

### Backend Integration
This frontend interacts with the [ASP.NET Core Web API with Keycloak Integration](https://github.com/yunuspektass/ASP.NET-Core-Web-API-Keycloak-Integration) backend. Make sure the backend is running and properly configured.

### Contributing
Contributions are welcome! Fork the repository, create a new branch, and submit a pull request.

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Why Keycloak?
Keycloak is an open-source identity and access management solution that provides secure authentication and authorization for modern applications.

### Why Nuxt.js?
Nuxt.js simplifies the development of server-side rendered (SSR) and static web applications with its modular structure and automatic routing.

---

### Links
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Nuxt.js Documentation](https://nuxtjs.org/docs)
- [Vuetify Documentation](https://vuetifyjs.com)
```
