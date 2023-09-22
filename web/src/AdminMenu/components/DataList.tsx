import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'hidden'
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  list: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: 12,
    gap: 4
  }
}));

interface ListProps {
  children: React.ReactNode;
};

const DataList: React.FC<ListProps> = (props) => {
  const { classes } = useStyles();
  const { children } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.list}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DataList;



