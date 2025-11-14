const API_URL = 'http://localhost/PROJET%20IMMO/backend/auth';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/login.php`,
    register: `${API_URL}/register.php`,
    logout: `${API_URL}/logout.php`,
    getUser: `${API_URL}/getUser.php`,
    uploadPhoto: `${API_URL}/uploadPhoto.php`,
    forgotPassword: `${API_URL}/forgot-password.php`,
    messages: `${API_URL}/messages.php`,
  },
  admin: {
    users: `${API_URL}/../routes/admin/users.php`,
    agencies: `${API_URL}/../routes/admin/agencies.php`,
    reports: `${API_URL}/../routes/admin/reports.php`,
  },
  agent: {
    properties: `${API_URL}/../routes/agent/properties.php`,
    tenants: `${API_URL}/../routes/agent/tenants.php`,
    leases: `${API_URL}/../routes/agent/leases.php`,
  },
  tenant: {
    profile: `${API_URL}/../routes/tenant/profile.php`,
    payments: `${API_URL}/../routes/tenant/payments.php`,
    documents: `${API_URL}/../routes/tenant/documents.php`,
  },
}; 