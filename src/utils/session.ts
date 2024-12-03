export const setSession = (value: string) => {
  localStorage.setItem('access_token', value)
}

export function getSession() {
  return localStorage.getItem('access_token')
}

export function createAuthorizationHeader(headers: any) {
  const token = getSession();
  // Convert headers to Headers object if needed
  const headersInstance = new Headers(headers);
  headersInstance.set("domain", process.env.NEXT_PUBLIC_API_URL as string)
  if (token) {
    headersInstance.set('Authorization', `Bearer ${token}`);
  }
  return headersInstance;
}

export function deleteCookie() {
  localStorage.removeItem('access_token')
}