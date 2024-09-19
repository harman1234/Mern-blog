import React from 'react';
import Avatar from '@mui/material/Avatar';

export default function MyAvatar({ children, sx = {}, ...rest }) {
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  function stringAvatar(name) {
    return {
      bgcolor: stringToColor(name),
      children: `${name.split(' ')[0][0]}`,
    };
  }

  // Combine default styles with the sx prop
  const avatarStyles = {
    ...stringAvatar(`${children[0]}bepinecncncpi`),
    ...sx,
  };

  return (
    <>
    <Avatar  style={{textTransform:'uppercase'}} children={children[0]} sx={avatarStyles} {...rest} />
    </>
  );
}
