import { useState } from 'react';
import { createStyles, Collapse } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'min-content',
    overflowY: 'visible'
  },
  header: {
    color: 'white',
    background: theme.colors.ag[6],
    position: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    height: '2.75rem',
    alignItems: 'center',
    overflowX: 'hidden',
    transition: 'all 0.2s ease',
    borderRadius: 0,
    ':hover': {
      background: theme.colors.ag[3],
      cursor: 'pointer'
    }
  },
  label: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontWeight: 500,
    paddingLeft: 8,
    fontSize: 14,
    textAlign: 'left',
    overflow: 'hidden'
  },
  expand: {
    color: 'white',
    background: theme.colors.ag[5],
    position: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'left',
    alignContent: 'center',
    padding: 12,
    gap: 6
  },
  expandIcon: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: 12
  },
}));

interface ExpandProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
};

const Expand: React.FC<ExpandProps> = (props) => {
  const { classes } = useStyles();
  const { label, children } = props;
  const [isExpanded, setExpand] = useState<boolean>(false);

  const handleClick = () => {
    setExpand(!isExpanded);
  };

  const expandedStyle = {
    background: isExpanded ? '#1864AB' : '',
    color: isExpanded ? 'white' : '',
  };

  const expandIcon = {
    transform: isExpanded ? 'rotate(-180deg)' : '',
    transition: 'all 0.2s ease',
    fontSize: 14,
  };

  return (
    <div className={classes.container}>

      <div className={classes.header} style={expandedStyle}>
        <div className={classes.expandIcon}>
          <i className='fas fa-chevron-down' style={expandIcon} />
        </div>
        <div className={classes.label} onClick={handleClick}>
          {label}
        </div>
      </div>

      <Collapse transitionDuration={200} in={isExpanded}>
        <div className={classes.expand}>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default Expand;