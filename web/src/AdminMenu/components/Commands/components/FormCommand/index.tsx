import React, { useState, useEffect } from 'react';
import { createStyles, Button, Divider, Stack, Group, Collapse } from '@mantine/core';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormCheckbox, FormInput, FormNumber, FormSelect, FormAutoComplete, FormSlider } from './components';
import { fetchNui } from '../../../../../utils/fetchNui';
import type { FormCommandProps, ArgsProps } from '../../types';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'min-content',
    overflowY: 'visible',
  },
  header: {
    color: 'white',
    background: theme.colors.ag[6],
    position: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    height: '2.25rem',
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    overflowX: 'hidden',
    transition: 'all 0.2s ease',
    borderRadius: 0,
    ':hover': {
      background: theme.colors.ag[3],
      cursor: 'pointer',
    },
  },
  label: {
    position: 'inherit',
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
  expand: {
    background: theme.colors.ag[5],
    position: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'left',
    alignContent: 'center',
    padding: 12,
    gap: 6,
  },
  expandIcon: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: 12,
  },
}));

const FormCommand: React.FC<FormCommandProps> = (props) => {
  const { classes } = useStyles();
  const { label, command, args, buttons, close } = props;
  const [fields, setFields] = useState<ArgsProps>(props.args ? props.args : []);
  const form = useForm<{ test: { value: any }[] }>({});
  const fieldForm = useFieldArray({
    control: form.control,
    name: 'test',
  });
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

  useEffect(() => {
    if (!args) return;
    fields.forEach((row, index) => {
      fieldForm.insert(index, {
          value: row.type !== 'checkbox' ? row.default : row.checked,
        } || { value: null }
      );
    });
    setFields(args);
  }, [args]);

  const onSubmit = form.handleSubmit(async (data) => {
    const values: any[] = [];
    Object.values(data.test).forEach((obj: { value: any }) =>
      values.push(obj.value)
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    const stringValues = props.command + ' ' + values.join(' ');
    fetchNui('triggerCommand', stringValues);
    if (close) { fetchNui('closeMenu'); };
  });

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
        <form onSubmit={onSubmit} className={classes.expand}>
          <Stack spacing='xs'>
            {fieldForm.fields.map((row, index) => {
              const item = fields[index];
              return (
                <React.Fragment key={row.id}>
                  {item.type === 'checkbox' && (
                    <FormCheckbox
                      register={form.register(`test.${index}.value`, {
                        required: item.required,
                      })}
                      args={item}
                      index={index}
                    />
                  )}
                  {item.type === 'input' && (
                    <FormInput
                      register={form.register(`test.${index}.value`, {
                        required: item.required,
                      })}
                      args={item}
                      index={index}
                    />
                  )}
                  {item.type === 'number' && (
                    <FormNumber control={form.control} args={item} index={index} />
                  )}
                  {(item.type === 'select' || item.type === 'multi-select') && (
                    <FormSelect control={form.control} args={item} index={index} />
                  )}
                  {item.type === 'autocomplete' && (
                    <FormAutoComplete control={form.control} args={item} index={index} />
                  )}
                  {item.type === 'slider' && (
                    <FormSlider control={form.control} args={item} index={index} />
                  )}
                </React.Fragment>
              );
            })}
          </Stack>
          <Divider my='sm' />
          <Group spacing='xs'>
            <Button variant='light' color='blue' type='submit'>
              {buttons?.execute ? buttons.execute : 'Execute'}
            </Button>
            {buttons?.extra?.map((v, index) => {
              return (
                <React.Fragment key={index}>
                  <Button
                    key={index}
                    variant='light'
                    color={v.color}
                    onClick={() => {
                      fetchNui('triggerCommand', v.command);
                    }}
                  >
                    {v.label}
                  </Button>
                </React.Fragment>
              );
            })}
          </Group>
        </form>
      </Collapse>

    </div>
  );
};

export default FormCommand;
