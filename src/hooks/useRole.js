// src/hooks/useRole.js
export function useRole() {
  return localStorage.getItem('ipelams_role') || 'logistics';
}