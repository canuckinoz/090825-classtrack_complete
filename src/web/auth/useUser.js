export function useUser(){
  const u = window.currentUser || { role:'teacher', scope:{ classIds:['CLASS-3A'] } };
  return u;
}


