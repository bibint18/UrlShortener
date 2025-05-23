export interface User{
  id:string
  fullName:string
  email:string
}

export interface AuthState{
  user: User | null
  accessToken:string |null
  refreshToken:string | null
}