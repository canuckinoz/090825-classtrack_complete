export function useUser(){
  const anyWindow: any = window as any;
  const u = anyWindow.currentUser || { role:'teacher', scope:{ classIds:['CLASS-3A'] } };
  return u;
}


