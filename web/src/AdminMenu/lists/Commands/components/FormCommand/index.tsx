import React, { useState, useEffect } from 'react';
import { Button, Divider, Stack, Group } from '@mantine/core';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormCheckbox, FormInput, FormNumber, FormSelect, FormAutoComplete, FormSlider } from './components';
import type { FormCommandProps, ArgsProps } from '../../types';
import Expand from '../../../../components/Expand';
import { fetchNui } from '../../../../../utils/fetchNui';

const FormCommand: React.FC<FormCommandProps> = (props) => {
  const { label, command, args, buttons, close } = props;
  const [fields, setFields] = useState<ArgsProps>(props.args ? props.args : []);
  const form = useForm<{ test: { value: any }[] }>({});
  const fieldForm = useFieldArray({
    control: form.control,
    name: 'test',
  });

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
    const stringValues = command + ' ' + values.join(' ');
    fetchNui('triggerCommand', stringValues);
    if (close) {
      fetchNui('closeMenu');
    }
  });

  return (
    <Expand label={label}>
      <form onSubmit={onSubmit}>
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
    </Expand>
  );
};

export default FormCommand;
