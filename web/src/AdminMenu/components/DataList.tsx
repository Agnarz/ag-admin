import React, { useState } from 'react';
import { createStyles, TextInput } from '@mantine/core';

const useStyles = createStyles((theme) => ({
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
  filterBar: {
    background: theme.colors.ag[8],
    position: 'relative',
    height: 42,
    display: 'flex',
    flexDirection: 'row',
  },
  filterButtons: {
    background: '#00000000',
    color: 'white',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '100%',
    fontSize: 13,
    transition: 'all 0.2s ease',
    ':hover': {
      background: theme.colors.ag[3],
      cursor: 'pointer',
    }
  },
  search: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
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
  context: {
    list: string;
    filter: string;
    filters: { label: string; value: string }[];
    setFilter(value: string): void;
    search: string;
    setSearch(value: string): void;
  };
};

export const DataList: React.FC<ListProps> = ({children, context}) => {
  const { classes } = useStyles();
  const { list, filter, filters, setFilter, search, setSearch} = context;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.filterBar}>
          {filters.map((v, index) => (
            <React.Fragment key={index}>
              <div
                className={classes.filterButtons}
                style={{background: filter == v.value ? '#1971C2' : ''}}
                onClick={() => setFilter(v.value)}
              >
                {v.label}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className={classes.search}>
          <TextInput
            style={{position: 'relative', width: '100%', height: '100%'}}
            styles={{
              input: {
                borderBottom: '2px solid #ffffff14!important',
                padding: 8,
                transition: 'all 0.2s ease',
                ':hover': {
                  borderBottom: '2px solid #ffffff88!important'
                },
                ':focus': {
                  borderBottom: '2px solid #1971C2!important'
                }
              }
            }}
            variant='unstyled'
            placeholder={`Type to filter ${list}`}
            radius='sm'
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </div>
        <div className={classes.list}>
          {children}
        </div>
      </div>
    </div>
  );
};
