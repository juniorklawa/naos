import System from './System';
import computerIcon from '../assets/my-computer.ico';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genIndex = gen();
const genId = gen();
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
      x: 210,
      y: 20,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: System,
    header: {
      title: 'Processos',
      icon: computerIcon,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 150,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: System,
    header: {
      title: 'Memória',
      icon: computerIcon,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 200,
      y: 23,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: System,
    header: {
      title: 'Terminal',
      icon: computerIcon,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 350,
      y: 10,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: System,
    header: {
      title: 'Arquivos',
      icon: computerIcon,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 100,
      y: 15,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
];

export { System };
