import React, { useState } from 'react';

interface DesktopIconProps {
  label: string;
  icon: string;
  selectedIcon: string;
  setSelectedIcon: (icon: string) => void;
  onClick: () => void;
}

const DesktopIcon = ({
  label,
  icon,
  selectedIcon,
  setSelectedIcon,
  onClick,
}: DesktopIconProps) => {
  const [clickedCount, setClickedCount] = useState(0);

  const handleOnClick = () => {
    setClickedCount(clickedCount + 1);
    setSelectedIcon(label);
  };

  return (
    <button
      onClick={handleOnClick}
      onDoubleClick={() => {
        // alert
        onClick();
      }}
      type="button"
      style={{
        height: 80,
        width: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        filter: selectedIcon === label ? 'drop-shadow(blue 0px 0px)' : 'none',
      }}
    >
      <img
        src={icon}
        alt="My Computer"
        style={{
          height: 50,
          width: 50,
          display: 'flex',
          justifyContent: 'center',
          opacity: selectedIcon === label ? 0.5 : 1,
        }}
      />

      <p
        style={{
          display: 'flex',
          marginTop: 4,
          textAlign: 'center',
          fontFamily: 'Tahoma, Geneva, sans-serif',
          color: '#ffffff',
          textShadow: '1px 1px 1px #000',
          fontSize: 12,
          padding: '4px 4px',
          backgroundColor:
            selectedIcon === label ? 'rgba(0, 0, 255, 0.5)' : 'transparent',
        }}
      >
        {label}
      </p>
    </button>
  );
};

export default DesktopIcon;
