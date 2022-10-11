import React, { ReactNode, useEffect, useState } from 'react';
import si from 'systeminformation';
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
            onClick={() => onAddApp(3)}
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
          src="data:image/png;base64,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"
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
