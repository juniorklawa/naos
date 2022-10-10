import System from './System';
import computerIcon from '../assets/my-computer.ico';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();
export const defaultAppState = [
  {
    component: System,
    header: {
      title: 'Sistema',
      icon: computerIcon,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 250,
      y: 40,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
];

export const defaultIconState = [
  {
    id: 2,
    icon: computerIcon,
    title: 'Sistema',
    component: System,
    isFocus: false,
  },
];

export const appSettings = {
  Sistema: {
    header: {
      icon: computerIcon,
      title: 'Sistema',
    },
    component: System,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
};

export { System };
