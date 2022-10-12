import System from './System';
import Memory from './Memory';
import diskIcon from '../assets/disk.ico';
import folderIcon from '../assets/folder.ico';
import computerIcon from '../assets/my-computer.ico';
import terminalIcon from '../assets/terminal.ico';
import threadsIcon from '../assets/threads.ico';
import Processes from './Processes';
import Files from './Files';

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
    component: Processes,
    header: {
      title: 'Processos',
      icon: threadsIcon,
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
    component: Memory,
    header: {
      title: 'Memória',
      icon: diskIcon,
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
      icon: terminalIcon,
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
    component: Files,
    header: {
      title: 'Arquivos',
      icon: folderIcon,
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
