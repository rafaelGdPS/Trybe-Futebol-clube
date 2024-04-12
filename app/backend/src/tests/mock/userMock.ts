const validEmail = 'user@user.com'
const validPassword = 'tpeasstsword'

const validRequest = {
emai: validEmail,
password: validPassword
}

const validToken = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
}

const existUser = {
  username: 'User',
  role: 'user',
  email: validEmail,
  password: validPassword, 

}

export default {
  existUser,
  validEmail,
  validPassword,
  validRequest,
  validToken,
}