import React, { ReactNode, useEffect, useState } from 'react';
import si from 'systeminformation';
import child_process from 'child_process';
import WindowsBackground from '../../assets/background.jpg';
import diskIcon from '../../assets/disk.ico';
import folderIcon from '../../assets/folder.ico';
import computerIcon from '../../assets/my-computer.ico';
import terminalIcon from '../../assets/terminal.ico';
import threadsIcon from '../../assets/threads.ico';
import DesktopIcon from '../../components/DesktopIcon';
import Windows from '../../components/Window';
import { defaultAppState } from '../../Apps';
import { Container } from './styles';

export interface IApp {
  component: ReactNode;
  header: {
    title: string;
    icon: string;
  };
  defaultSize: {
    width: number;
    height: number;
  };
  defaultOffset: {
    x: number;
    y: number;
  };
  resizable: boolean;
  minimized: boolean;
  maximized: boolean;
  id: number;
  zIndex: number;
}

interface IAppState {
  apps: IApp[];
  nextZIndex: number;
}

const initState: IAppState = {
  apps: [],
  nextZIndex: defaultAppState.length,
};

const Desktop = () => {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [naOSState, setNaOSState] = useState(initState);

  const iconsData = [
    {
      label: 'Sistema',
      icon: computerIcon,
    },
    {
      label: 'Processos',
      icon: threadsIcon,
    },
    {
      label: 'Memória',
      icon: diskIcon,
    },
    {
      label: 'Terminal',
      icon: terminalIcon,
    },
    {
      label: 'Arquivos',
      icon: folderIcon,
    },
  ];

  const [time, setTime] = useState('');

  const getTime = () => {
    const ms = si.time().current;

    const date = new Date(ms);

    const hours = date.getHours();
    const hoursString = hours < 10 ? `0${hours}` : hours;

    const minutes = date.getMinutes();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;

    const period = hours < 12 ? 'AM' : 'PM';

    const formattedTime = `${hoursString}:${minutesString} ${period}`;

    setTime(formattedTime);
  };
  function getFocusedAppId() {
    const focusedApp = [...naOSState.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find((app) => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }

  const focusedAppId = getFocusedAppId();

  const onMaximizeWindow = (id: number) => {
    if (id === focusedAppId) {
      setNaOSState({
        ...naOSState,
        apps: naOSState.apps.map((app) =>
          app.id === id ? { ...app, maximized: !app.maximized } : app
        ),
      });
    }
  };
  const onMinimizeWindow = (id: number) => {
    if (id === focusedAppId) {
      setNaOSState({
        ...naOSState,
        apps: naOSState.apps.map((app) =>
          app.id === id ? { ...app, minimized: !app.minimized } : app
        ),
      });
    }
  };
  const onFocusApp = (id: number) => {
    setNaOSState({
      ...naOSState,
      nextZIndex: naOSState.nextZIndex + 1,
      apps: naOSState.apps.map((app) => {
        if (app.id === id) {
          return { ...app, zIndex: naOSState.nextZIndex };
        }
        return app;
      }),
    });
  };

  const onCloseApp = (id: number) => {
    setNaOSState({
      ...naOSState,
      apps: naOSState.apps.filter((app) => app.id !== id),
    });
  };

  const onAddApp = (id: number) => {
    setNaOSState({
      ...naOSState,
      nextZIndex: naOSState.nextZIndex + 1,
      apps: [...naOSState.apps, defaultAppState.find((app) => app.id === id)],
    });
  };

  const openTerminal = () => {
    if (process.platform === 'linux') {
      const { exec } = child_process;
      exec('gnome-terminal --working-directory=$HOME');
    }

    if (process.platform === 'win32') {
      const { exec } = child_process;
      exec('start cmd.exe');
    }

    if (process.platform === 'darwin') {
      const { exec } = child_process;
      exec('open -a Terminal');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      style={{
        backgroundImage: `url(${WindowsBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        zIndex: -1,
        flexDirection: 'column',
        display: 'flex',
        height: '100vh',
      }}
    >
      <div style={{ flex: 1, position: 'absolute', padding: 32 }}>
        <div
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <DesktopIcon
            onClick={() => onAddApp(0)}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[0].icon}
            label={iconsData[0].label}
          />

          <DesktopIcon
            onClick={() => onAddApp(1)}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[1].icon}
            label={iconsData[1].label}
          />
        </div>

        <div
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 32,
            display: 'flex',
            position: 'absolute',
          }}
        >
          <DesktopIcon
            onClick={() => onAddApp(2)}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[2].icon}
            label={iconsData[2].label}
          />

          <DesktopIcon
            onClick={() => openTerminal()}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[3].icon}
            label={iconsData[3].label}
          />
        </div>

        <div
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 148,
            display: 'flex',
            position: 'absolute',
          }}
        >
          <DesktopIcon
            onClick={() => onAddApp(4)}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[4].icon}
            label={iconsData[4].label}
          />
        </div>
      </div>

      <Windows
        apps={naOSState.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
      />

      <footer
        style={{
          height: 30,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          display: 'flex',

          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,

          background:
            'linear-gradient(rgb(31, 47, 134) 0px, rgb(49, 101, 196) 3%, rgb(54, 130, 229) 6%, rgb(68, 144, 230) 10%, rgb(56, 131, 229) 12%, rgb(43, 113, 224) 15%, rgb(38, 99, 218) 18%, rgb(35, 91, 214) 20%, rgb(34, 88, 213) 23%, rgb(33, 87, 214) 38%, rgb(36, 93, 219) 54%, rgb(37, 98, 223) 86%, rgb(36, 95, 220) 89%, rgb(33, 88, 212) 92%, rgb(29, 78, 192) 95%, rgb(25, 65, 165) 98%)',
        }}
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAiCAYAAAC3KkyWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAY5ElEQVRo3n2baawl13Hff3VOd9/l3fvmLfM4G5fhhCS4iEORlmQKsinJUrRaXmiI8aIYdgx/sh0gHww4XwI4H4IAMRLAX/IlAgwkiCzJUCA5CS05kkjLBDWRbEkhRZEcLsMZzj5v3nbfXbr7VOXD6e7bd2ao9+bOu/d29+lzqk5V/avq3/LQzy1Z0AAWQMA7h3OCCChG9Q/nQEQQJwiAxM9JkuCdQ5ygZoQQ0KDEH4v/m6Gq8ZjG9xg473HOIYAqTKcFIRjeOzqdlE6W4bwnVOOJxFHVckIoEeL90yzBe09QoyhyQhkA8N4hIpgZZgYIrlofJpgpRvxeHIDWU47nOEGkOlcNM6Us4/qKUgnBEAHnHN4nJN7jqzWZGUEVU0PVEOJYqkbQUMkirstVC4vXBF47RbXS+U+yc/xxVjqbpF4RHxWExImLSHwvc8VQH6+1Fe/U/HHGLX5s/n/7uAdJ6jOEocW/IgYOXHO+NIIGg9yw6n28c5yXN8GjzfClKN7iRgiimCxOrpZGkiTVh/nxkgCVGuvbAiQmgJLJfG6I4AREAY1zFRxeDDxoNYTDY0FRMdQZgsU5aRwshJLpNOf4iVU784VTC8pKypkhy57eSp9Bb0CWZPjExynG0aMlVUoS13ovgsPhvEPqZQs/9ad92KqdlCZJvF6g1odo6wJZ0DeT2bQWYby/c4sntD4t3K913FVeYBzGcT03bS37qWuQW2w8A0yVoIq3KMMgZaOouEAloATTaFFi0ZAra+rMcpbShDM33vPo5z5md9+es7Y6ZGVpheX+MkvdJZIkiS7QCRLNKwqz+S66IkFw4hqJiJNqwmDoXFIKSFx+7XIEw3Bx/Gbx0deKRZcg9djWGA55WQABFUGssn4DUcHc4iao7c4htPVRu8Rc8zinOD0Ky1E0bpjGE2ijFGspS4lCBo2CRimtjNYfF4qZUWqI69I4SElJqQGtvlczyhCvy/OcfD8Qrq/wzL/7UjPjxHlHN+sx6AwY9AcMe0OWOktkaTZXlJPGvyNuQVFW7WpcnIcT4gQs7hKkFoLR/FqlCbU4d3FILRQ1ascWt0blA1uCS32Kq2KimWECYrV/jhtAGxuXyltHlZWmVHfFMDrWXbC+zJJqjnOrCgQCZbWmatPV86n8s5oRCHhzzfWVtkmCNgpRC4g6nFOCBVRLQhNDDXMploHrjBZjVMhLhIwsyegkHbzzmClFKEBrF1G5P4u+UF00WZEoXicOtAnLqIZK6IqZsgAtqslLtRjFoo+vDtUTjqYgt/A1c4ugUf6ig2tfikVFBQsoijYA4mZnKdX8ajsyoRJwoLBybhUtJdZhTyGObaFZs9Zrqc4PKFoDCdPGqtQUrb8LgVJLch/4yqmvrD/5s09uxthYhMZnp5IiBnnIMSMiISWiliY2CUHK+WJdVE69q6UlhmhZijaewJqd2I7FjYuqz2tGsHcMcLU116fYjZFpIa7F3R5R7PyCqAT9qdHJBMxCVLS1QFEr8mDz8cy0QZmlhfn8DJSI9FQDwZSgEQWbxe+DWjxWBkoCX/izL2w3FtWeYrBAHnJKDQQJDWwsNSIgEakQXjRjjzKkZF0LljBS7zEce+MJl9IuoyQhNA5v0WLE5CYUVmtD0WarWnuXu5aByYKoGoXYDWgmWpbepPO4KaKwFpQktRtqKapx2TFWmVgVf5pg1QxaK94MSiurW0dL1Op4Y0VVqlIrSpX4t4ypzKt3v17WS2wUpabkmpMr5JpTWtlA9TjJEN9XMNaLcFc+5aHpNveUuxxJHb3hOoV6Lr1xmufdKi+vrHN1uUvh5zs8WpXMXYu1JF2BE23Ce33O3HrrqGM3Oa1FwF4PXG+GeojGvcmtcJ01VtYclXmcbeJWpUzVas7V4Kr1tfMNWVuShThIbVFa51gV+tOgYEYIhoYq52zlOo2iirIgL2aYwCSfUIQ8CqaC4lpZVMz/jAPA+3Yu8nM7F+i5CbKyBtlhbG9M7+03mJ2H/Ng/4fJ9R5msZkjiGtcW87CYLJa6GC1kQWQ238HMd65UvwsuUisVzZO+BrEt+soKxbn51RXOaJCeLeR+UruCFlqtt1GVTNdxyOaCt5ab1VqpWsH3ULlHrawqGBZCZXXRLUYXCif+5f32xp+/HNNNMyMvcqaFx4C8yClCQXBhLrk6oLuY0d+txkYxo6tT8ArdIUiGbZ1lMoHRPlzdguunr5Dc70lWlwiSVWjRyFJIPGzupov+qFWBsIVfkETmQKIWV1Ayc3RJSSQhaMlusQ9ZAqlbCGwLrlbaIr81YGksKiguCD1SOsTkeDvfRb2gqcy9TjsGtqNdE9uardcKyPP3phbTGjGshHJWEiZhblGlluShwOUOE6MIBaUW0USlhtAxR8Li8m6fTVktpxWm7UB3EOH21jVGExgF4a3lAWN/mo3pLkeHy3TXl/EdR39Y0umOuXoJLl17OM5CbshUbY68GpmVxOpJGymUJffd9jCfeuAXedftj3D60sv86Vf/NUgGaRatt/axN97jVmBFWqWIxgMrBzvr/NIDv8IT936YxCX84X//XTaLHVySYM5hrsr/xOFcZUFWQxvDWcQA9WZvMI8IToxS5pOwwjBdBFTJjYgpZtaBwooIZ9EFlIwKqXMcLceshGl0j50eJD2YjLGdbUZT2Fpa40I+gc6EpSF0h/sM1yYM1oTuwNjfgp1zS+SjHLdSVzak2XdiFv1iGZAQIBjiq4mkHnwSC5CzgmVZ4sjwCP10icn+CEaTal6exr8WAcrQClYSx0l8tD4hnlMEpAjzuGgGZaAzWOXY0mHWButc2jyP7Y2BWTWXlpZd1K5zggUX5Ve5beck5ncW8692eI5JaPwbboBEx37vI5YAFFpQhoKycKgYhRUUWqCiTSWhHgQR3p077ikLlooJJCX0e5AKev0q+WjGzlQ4f3CdaTKj041eMetD2jGSTgywk52M0bk18q0Z6TCr6oy1z1PIS04eOskvnfxVbl+9g07WxdS4unOJf3z9eb758t+yM9rmyff8Bp969Jc5dOAoqU95/P4n+Le/+ef8my//K8iioj5x/6d5712Pc9vyYbIkYzwdcebK65x64zm+e/75ZgP83s/8Pg8feYQfvXaK66Or3H7wOMcP3UMn6RJCyV0bJ/Au4dDaUf7D73yeP/0ff8zZ2UWs46tCbx1GpUnkfBVLg4SmylIXZwnRCALgtEaRhqfGBTUc3yIJYYZZQhlKCu8xMYKVlFWCGH27LviH9+1u0tnZ5Nz2Llu+z/V9h8gWBy6cxb0+5cxlx9ljGUnvGsOVQGdJ8B3BZ+A8hBJG1zy7F4eEUkmcVn6+qiGGwHvvfB9PPvxrnLzjUbpZr0rEjSMrxzi2ejtePN964WmOHjjCsdU78D7ioiztMOgsYWUJRclH7v84n3zoM9y5fpxO0sE5TxlKbhseoiwLnn/tWSSL1967fi/H108w2rrGw7c/wrGNu2MOpsqgNyRNsqo2mTHsLJMEmcfUCpG46v9YKJlXG715VLQqlxkOBRPUpKmlWlMMkJb7hxBmJGaG5kbZL3HmMYlFQ7XQWFQbPYkJ3+hl/GTyCOYG7Ls1JuEwxXSKjA6wkgwZr494E5Bkm+UVpbvkSDJI06io2Qj2Lnt2dgSGVQVZ5gmwM+XE+gnedfsjTCf7fOfUX/Piq9/j5IPv5/FHPsptK0d54sGP8uIrp/j6s3/JSjLkA+/+GFeunOfvTn2N7589VdX8lJ+/58PcuXacq1sX+c4/Pk0/6/P4yY9y29pRjqwchWmB9UtwcKC/ggAnjt7PaLzLy2/8gBde/x7nLpzmniMP8uuf+SNUA99+9q/4/pnnubJ9EYYSvU3l/sRYEHIs6ytoxKnS6giICaKVoqj/3qr5YDFGhVAS1BE0YM6q2pZG/L9gS4Kjz6v6CS7KwyQH1lk5MGDjYA8b57xZXuFVfQ1x32ZfX2MtMZK+w3UFl4IlkBewc7nD1tkh+3mJ9DxVZaqVEgW6SUYv6zPe2+Hi+Tf51je/yGuv/IAXfvT3fOIjv8XV3cvMRntMJvuMxyPM4Nz50/yvb/1XLsoWHFoGVZ558Wl+8P+e5frl8/zk1X+gIylJDp/55L8gcylMc8gzEOikXbzzzKZj/u65r/KDV5/j/PY5yjznYP82EJhO9/nq33yeM8UF9FAfkkGs4HhpckShnQTHuI6zJqlopGmxjuoQzDvEDAmxprpQMXHjqCiVUCVqVfGQiPZisqYLbYCuHGNQfJJg99EZdDl6JOXO24TNLePShRlXuQPxZ1hfeoml3irTPWP7nFHsCeM+OIXdt7tsn1+mcEqnl0QlucXkcn+6x2i8w3CwwmMPP0E+nTDa2+LKlXN89enPs1lscWXzPA/c9W4Or99OCCXXd69yafs8HFmOQKJQrmxdIOscZmPlKEffdweixsH1o5RlwXQ6RoqAK42H73iUbtJDTfnOd/+av/37L3Nxcgl6KXesHefEXQ8hwGi8w1uXTxMOLyG9FEldRHEiC6BcfMuybJ5WiEjjQerKtjjBecHUIU4jxGtHGzejyaMCgUKKKvDNXR9ChJ7VjTrhXpbcIfJkiWFPWB9CmsB4AuVE0cmMTrLNuw9uMTjYZWZdpptCsufoZ8Z6WjLY8bw0S5F+jiw5yFrQWCIWffnCCzz30v/h3cffx4kTD3PvPY+yt7vJ2xff4BvP/CVvXHqZUT5iZWWD4WCF2WzKOB/BoIMMOvh+xoPDB/jlk7/GvYcfZHX5IFnabXpX48mI0f5OjDnB8cR9H6WbdNndu873XniGi/sXkNuWkX5Kf32djY1jhBDY3bsOgwwZZMigA90U836e31Xuy6zVdMQgzBU17+fFGqqFxfLkotczhG6VR1kgqIvdSWcEStRpDH6+rsnFvpOfPYCVfbyDfhd6HSgL2N1VpvtTNGzRGbzOfYOr3Heoi/WGTCTBpY61JeVgVvDSWxlff30Jt+RwA4G0rShBUri08zbP/uhpzr31CnccvJuN9WPcd/dJHnvkgxw5fJw3/9sfsHfhFVZWo6LyfMI4HyGDFAYpab/Hr7//dzh553soZlO2dq5ybfMig8EBjh26m6LM2Z/sxZgYjI3lwzjnuLZ5kZkUyEoXt9GHbkp/bZWN9aOoBrb3rkM/hX5UFt2kyevqhNeaMFEJ27mYQ9U1FYt9sxij7KZuq6taJc1nlqlz/egTNeYr6isgIda6QEjCEDc9QVH26KSw3Icsg719GO0q0/GIJHmLld41eh1H5pVDS7tsrEJ3KbbdL211ObMzYIsSWfbQrQJxq8UvXviZez/AEV3jG89+kWsXzrJ2YIM/+u1/z+OP/VMO33Ynab8HCfR7A7pZn/Foh1kxBe8gEbwI9x15iNSnvHLm+/zDD7/Nj1/7Po+d/CCf+vA/pwgztveuURM2VpfW8c6zvXuNIgmw0oPVHngh63ZZ6g0xUyaTUXWPeJ8IIupSZdVFs3bC2upa17FJ5pSHukR3a/LCnLPgqBp5AW1eWhc7ZN6Ox0M3v5s0bBBCQuIDw36JEdgbKXujkulkm073J9y3fp1hz9NNoZPG3LRCpVze6/Hq9grWE/zQI1nVmPTRr0ultGMH7+LJJ36X3/z4H7KxfJjVzhqjna2qFb+PmiJpgksSnDic8yxlQ1a6qzFxnZRkPkMQrl45z49feJ73PvQhPv7B32Bl5SD74z0uXT2LdBKcdwy6Q0QcV7cuMJMSN+jg+ikuTSJ5xSXR9addNgaHcEpMpKvkdcF1OwEfX3U/08n8faOgG4sh76Cs//SpP0kSq5tq5ppCZ62kmjcRO7yOzvg9iBqi+9h4wsWzE6683WF7r894VynKLYbLr3LfgSsM+gndTOik4JKGLsD2JOHipItbmiE9gQ7zElL98hHEDPrLfPpDv8UvfvhzTY5hGG+ceZHpbAwCQXOClmwcPMY/+/Qf8ODJx/njL/4+NplxdfsSR9fv4Bc+9Fl+4UOfpSjyai1w9uJpvnnqK8jGAO9SDh44hBPH15/7EhcmZ3F3rYJ3VeFUKUJOp7PO+9/7Cd7/3k/w2//502wWY7CUd6RXtKpAZos9NbHFdkptcm3gVnemn3rqqZDUGbAGkGDgDL3lXUt2iq/hZ99mNp6wY8q5ayWqghYnmY0+AP5t1g9sciCFbhYrM1ltTS5C8+sTuG7gBhG237Qbq3m+fPFFvnv6Ge4//C7Wlm/DzBhN9jh7/mX+7Mt/wiV3HYYZpzdf4fXLL/PQHY9hGLvjbST1qBjP/ORv+OQjT7K2vMFotMMPf/wd1lYP8/D9PxurFis9husH+fSjn0XEsbu/gw4SSDvQTaJVKFydXOGHZ07x8w98jG7WY3P3yjubAbeqWd66D/pTfN1Nl8vBX32/rd6+R2fJ4TuCZA5LDHy0KvESSywCbjNhem5CWRR45ymLEi2VhAHD5DCrnYzDB97kV46f5Z5DJUfWhJVVSPoReb92aZkv/fgQ//tyH90w3EGHdKWJUQ0aGuX0R47hrEu3SEgKmlJWUeZsltfRAymknp50GYQenakDM2Z9Y9PtAjB0A4aTDDcNaBmY5mO8S+j0+kxkxnXZxQ/6DDpDhtbDZgVXR5cpBh63NoBBBnlJslOyNEnoTRySB8Ig5Qo72EqGDbIYs26QcOQBWqsHZVioelAh9p+0jJ9DCIQ8oIUS8kDIS8qJku/njKc5l/7inCRgWKnNdraqoVW7oHnpytDlkuQeT0qCw1GWJcW4QPcmTPfPM/HLvDIu+J9X7+Rd44J3TbdZ3y3Yybu8fq3HS9eWeG3WQXuGdCS2LfwtCF5JwjTJmU23cJMSmZbzFlPi4EAHhh0kcUxDYLq/BUUeC7edTkRkJoxsyki3sLwAtXlSXe4gSxky7GFpwq6N2d3bjv5pOY3Qu7Yo7yhTY3s6YqucYtMcSbrIsNu0W+wGq6hb8Q2gsEh/s3bVou526GLOVF8XlSpc+otzVYfXatenSIgZdK0okUhssTpgZuA7FbtVHM4ciSbovuG2hXKqTMsOL24L53c837uyRleUWZmwk6eMXEo+AOkBHSL8b3OFrCHdxfwEwVKPFenc02Qe6UZYbE4gKJI46CTRdXeTeKwe1wnSKxYDhHe4ThqvkboxWLU2Eo9007ghIg0WyVJYitdJP4NOinRS8L6pjLd5GLU11cUF05ZC1BZ6UGh1fvWias/HAkSCmYmIxOq5BdAyQBVP1FusQTmNXDmt8H+1I1W0em9I6khTgS7oVOmGLrO9GVdK4eqsi5RVPygBtwRuGWTAPHfSG5p6FWrS1IFPsX5SkTEr6J44xPuKYw2oR9IE6cdKinjXMHcBLEtgkFXNamkyE2udZ2YxmFqFcCtKMqHiWqQOXIZ1E6S0CDIqFFfT27ixZaFV16FlNTW9ObpBmha8BatedccXQgCzDJEomESEeEJpEEJERWWsy6GGimChErZWglKJHIqa/SEO6ULIAh6PH/iYiZex6NjwHVKwzLCuxWqHzvl4NcVL2gxXVxcq3ZwfXrOqm7raHArfkq7ko7vUurYm7ba8zAkxnjmXw4DSFilOTsD5huBZt94JNkd0Df3KFmJU3bmNRJbatRlWWqMkWu8tgAVH0EGLM2E0zUIr3Jz56gyCEGLBD5c4QkXkkHo313Gj4j8ggnpFOtJYiVX8P1rtdRVFyrghagZu8+BB+7ch02gc3y1yJiL1s8WXfydkJUSurMp8HLu5ndDm670jWlNpeIlzcpMt0MJqNpKFqvGu85gVOXzxWAgBLavPRUBLQ3NFC8M0Azk4V5TVpVg1tNSKo1dVen2ViDppsV4tkvjbDw64VpHRMy+emDX1L1ybfiGLuQNzxOcqBbS/kxuyd6ndIL56qGDePZe2RVlbKTqvHNTn2iI58CYd6wKTc8FaFxXV4oxadHmhDSZqRVVPtdSK0qCEUrH6b2noTNEixqf/+LHPJU/9l6/VrXiJtNoixiWnlXDUgQfnBSfSMFrjK1S+PO5s9TJHVK69GFot9rq3NrcHa7RE04uJXEJt6TE+KdEQzFuJoJg2DxcsGpCbB+sbSjzt35vyHLmBp3dLRb1D/iOLLlFbCa21FGU1PUwNLcNcUSFghVUWJqhPeeqpp8ICXcymEEpFvEPTKq4kkb82jwuGw+PEEZxiLnIAfEXKbKjf0OxysZaCGiuLscI53zyP0VZUbEzP6UDSco3upmd6qvZ29dhK88xP3d+uH+1p1dk8DsHNaWChJXFfTTbMKWLR/VakHmuZrbWeumlTy6q5apvurDqnyiEEI1LECtCi+qygJoSZgWSc274rgf/bilHioPCgKZZkWEiQ4CA1REqUAiUgEhDRuGDvwCUElbgmqfpWBp5AEE/q00ZRUUeuAR64FJGkakv7hmwiGuJTGsRSiaDgDIcjMU9ZkybNYutK5u7YqHKV9iMXjS8UvEQVlQ2fweatiFYJrlapWm3NVfeg2gfWcAR1zlGsnaFUD1EIqFQxEdCq+xA0VDQ1jeAhr2G6Uug0juINNIEvf7lN4eX/A39vskBnkuDZAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA0LTAxVDEzOjU1OjU1KzAwOjAwPnFKAQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNC0wMVQxMzo1NTo1NSswMDowME8s8r0AAAAASUVORK5CYII="
          alt="start"
          className="footer__start"
        />

        <div
          style={{
            flexShrink: 0,
            borderLeft: '1px solid rgb(16,66,175)',
            boxShadow: 'inset 1px 0px 1px rgb(24,187,255)',
            background:
              'linear-gradient(rgb(12, 89, 185) 1%, rgb(19, 158, 233) 6%, rgb(24, 181, 242) 10%, rgb(19, 155, 235) 14%, rgb(18, 144, 232) 19%, rgb(13, 141, 234) 63%, rgb(13, 159, 241) 81%, rgb(15, 158, 237) 88%, rgb(17, 155, 233) 91%, rgb(19, 146, 226) 94%, rgb(19, 126, 215) 97%, rgb(9, 91, 201) 100%)',
            padding: '0px 10px',
            marginLeft: '10px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            className="footer__icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAJ9SURBVDhPjZJfaFJRHMdt9BQ9uDAiCUJ8GQSmoiCsRGiboG5MHURsttFKMoXc5nBCW5E0bUIXQWy73JgPSetO0NhwcBlsOVAcMowRBCOIxVZ72KKCpPXw63cO3ig2aF/4cLm/c77f8zt/JIdJrVY3ajSaKyqVyqxQKM5i6ThyjA7+T1qtNqzX68FoNILNZoPOzs7vGDSKQ6cREnRQsdhL6O9/+FWrNW0ZDAYwm83gcDigp6cH+vr6wOfzgVQqvYlTzyD/dqLR3HDG4y+gXC4DMbe3t4PX6wWn00m/Y2NjEIlEwGq1ruP0y8gJahTV1TU6X6v9BIvFAh0dHUBUKpVgcHAQPJ47kEwmIZFI0C5w+m3kHDWK6u19XBSEKjQ3N0M4HKZmlmUxIEC7yOVykE6nxYBx5AI1ijKZ7gqh0FNobW0Fv98PExMTEAwGIRB4QgNIYCaTEQMY5CI1ilIq29p0Ouem3W6HlhYHDAw8gpERFlwuFywsLECxWIR8Pg/RaPTwANRJuVzeS1Zzuz00hDA5+QwqlQpdneM4UCqV5BAfIE2x2OprYpyb+7ZMvg3IKexgJxQKwezsLG2b3Eo2m4WlpSVx9efINUTGsps7mO2fmtrewH+qBnw8XjIxlUoBz/PUXCgURPMccg+RxePLwtBQ9RUGrAWDbzliFtWo0+kYYiAHRsBr3cI6j9xHZIKw9ymR2Kyh+fzMzO4vYvpb5JmSO7YjZK/kwMaRW4isu3v+eiazW3O7K1dXVva3h4fXs1g/IBIiQ5oQctrkzuUM8+Ydx32sEnOhsL/BMB/+7P3IwrYji4u1H9Ho+7V66eji+b0v09Of17CDS/VSXRLJb3mhSY8ZnaUBAAAAAElFTkSuQmCC"
            alt=""
          />
          <img
            className="footer__icon"
            height={16}
            width={16}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAACACAMAAAAVp0btAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAUpQTFRFAAAADQwMIRoXHRsaCAgIDg4PFBMUCgoKERERGBgYFRYWSzUtGhYUUjgyUTs0JyIfIh8dJB0aRComSDQuXT84LCYiMCMeMismSTEqQS4oKhwYVzw0cU1EPichQTkzZUc9Ty8qvZWFto5+pHxyh19YrIV3RCMfODMtnHVpNy4pfllPkm1jd1tSOCQfWUI9Wzgyi2heOB0ZspGGflJOa1BIf2VcZ0A7s66owLewY0lCzsnFwpqNSEM7Uj85gXx2c25oV1BKT0pDlHZuooR7kY6J2NPQkmFexcC7paKcaGFbX1dQm2RloZmT393a2tjV4N7aDQwJx8XE0c7K1dPOtqOZwb24yMPASkhGHh0bMzIvycfC3NvX5ePgzsvHnZuXu7m20M3LmpmV7evotrayvLu54+DeaGdkgoJ+09HOs6+rfHp34N/cnJuZamZijWXkzgAAAG50Uk5TAP/////////////////////////////////////////////////////////////////////////+//7//////////////f/+///////8w+QDOJTo/7jnEwYKYqjPvU5idR18KICXDxRHTSk+PS5ESXiAAAATIUlEQVR4nLWb50Na2RLAKUq73kvvNYJBqiggJQKiENC1JOqmWFLNJtl9+/9/fTNzzrnFsu95yc4mlujjN/3MXM6zWJ4qf368vP2dy+3l5eXffzz5JUzLq69nN7POfH50NJl3ut1Op9PtT6fnZ1c/3r/69+nvPtz0j0a74x2Q8Xj38HAXZDQ5Opp3ZsfnZ5f/+XfxX2+mk4PdnUymeFcyO6PhfNY/Pvn417t/Cf7q89np0cE4w/EllKgqoMLBaAJeOL26/PwvqPDq8+VpfzLOgBQRG0ZoOBz2hplEoyVwwuHoqDubnl69/tX4759Op93hmCyPMqJXE1KgVCqCCuOD4eSoe3r5S0vi/Y+T6awz3M2g16MRr5Gu6YBqgBdAh9nV11+H/3523O8cAZ4cr2P6fD720afTgSKxO7/+/KvwX6+mQD8YQ9w1u/1+v00TP2nAPUAfMsPrX5QEP6+n8yFWXQlt9wu8bUUTu92u9wB9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"
            alt=""
          />

          <div
            style={{
              margin: '0px 5px',
              color: 'rgb(255,255,255)',
              fontSize: '12px',
              fontWeight: 'lighter',
              textShadow: 'none',
              fontFamily: 'Tahoma, Geneva, sans-serif',
            }}
          >
            {time}
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Desktop;
