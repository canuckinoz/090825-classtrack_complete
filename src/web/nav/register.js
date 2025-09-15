import { useUser } from '../auth/useUser';

export function AppMenu(){
  const u = useUser();
  const items = [];
  if (u.role === 'teacher'){
    items.push(
      { id:'quicklog', label:'Quick Log', href:'#/quicklog' },
      { id:'weather', label:'Weather', href:'#/weather' },
      { id:'garden', label:'Garden', href:'#/garden' },
      { id:'constellation', label:'Constellation', href:'#/stars' },
      { id:'ocean', label:'Ocean', href:'#/ocean' },
      { id:'abc', label:'ABC Tracker', href:'#/abc' },
      { id:'stories', label:'Data Stories', href:'#/stories' },
    );
  } else {
    // other roles...
  }
  return items;
}


