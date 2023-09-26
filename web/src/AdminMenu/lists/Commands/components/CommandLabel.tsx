import React from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 14,
    textAlign: 'left',
    overflow: 'hidden',
  },
  favToggle: {
    position: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    marginRight: 8,
  },
  label: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

interface CommandLabelProps {
  children?: string | React.ReactNode;
  command_id: number;
  fav: boolean;
  setFav(id: number): void;
  onClick?(data?: any): void;
};

export const CommandLabel: React.FC<CommandLabelProps> = (props) => {
  const { classes } = useStyles();
  const { children, fav, command_id, setFav, onClick } = props;
  const favIcon = { color: fav ? '#FFC107' : '#ffffff44', fontSize: 18 };

  return (
    <div className={classes.container}>
      <div className={classes.favToggle}>
        <i
          style={favIcon}
          className='fas fa-star'
          onClick={(e) => {
            e.stopPropagation();
            setFav(command_id);
          }}
        />
      </div>
      <div className={classes.label} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};
