import React, { useEffect, useState } from 'react';
import si from 'systeminformation';
import WindowsBackground from '../../assets/background.jpg';
import DesktopIcon from '../../components/DesktopIcon';
import computerIcon from '../../assets/my-computer.ico';
import diskIcon from '../../assets/disk.ico';
import myNetworkIcon from '../../assets/my-network.ico';
import folderIcon from '../../assets/folder.ico';
import usbIcon from '../../assets/usb.ico';
import { Container } from './styles';

const HomePage = () => {
  const [selectedIcon, setSelectedIcon] = useState('');

  const iconsData = [
    {
      label: 'Computador',
      icon: computerIcon,
    },
    {
      label: 'Disco',
      icon: diskIcon,
    },
    {
      label: 'Rede',
      icon: myNetworkIcon,
    },
    {
      label: 'USB',
      icon: usbIcon,
    },
    {
      label: 'Arquivos',
      icon: folderIcon,
    },
  ];

  const [time, setTime] = useState('');

  const getTime = () => {
    // promises style - new since version 3

    const ms = si.time().current;

    const date = new Date(ms);

    // hour + minute + period
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    setTime(formattedTime);
  };

  // run getTime function every second
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
      <div style={{ flex: 1, width: '12.5%', padding: 32 }}>
        <div
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <DesktopIcon
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[0].icon}
            label={iconsData[0].label}
          />

          <DesktopIcon
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
          }}
        >
          <DesktopIcon
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[2].icon}
            label={iconsData[2].label}
          />

          <DesktopIcon
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
            marginTop: 32,
            display: 'flex',
          }}
        >
          <DesktopIcon
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            icon={iconsData[4].icon}
            label={iconsData[4].label}
          />
        </div>
      </div>

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
        {/* <button
          type="button"
          style={{
            height: 30,
            width: 120,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Tahoma, Geneva, sans-serif',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          INICIAR
        </button>

        <div
          style={{
            width: 120,
            height: 30,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            color: '#ffffff',
            textShadow: '1px 1px 1px #000',
            fontSize: 18,
          }}
        >
          {time}
        </div> */}
      </footer>
    </Container>
  );
};

export default HomePage;
