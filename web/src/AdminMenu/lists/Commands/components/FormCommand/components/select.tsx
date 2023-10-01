import { MultiSelect, Select } from '@mantine/core';
import { Control, useController } from 'react-hook-form';
import { FormValues, ArgSelect } from '../../../../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface Props {
  args: ArgSelect;
  index: number;
  control: Control<FormValues>;
}
import { GetOptions } from '../../../options';
const FormSelect: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    rules: { required: props.args.required },
  });

  const optionsKey = props.args.optionsKey;
  if (optionsKey) {
    const options = GetOptions(optionsKey);
    props.args.options = options;
  } else {
    props.args.options =  props.args.options;
  };

  return (
    <>
      {props.args.type === 'select' ? (
        <Select
          data={props.args.options}
          value={controller.field.value}
          name={controller.field.name}
          ref={controller.field.ref}
          onBlur={controller.field.onBlur}
          onChange={controller.field.onChange}
          disabled={props.args.disabled}
          searchable={props.args.searchable}
          label={props.args.label + ' (' + props.args.options.length + ')'}
          description={props.args.description}
          withAsterisk={props.args.required}
          clearable={props.args.clearable}
          icon={props.args.icon && <FontAwesomeIcon icon={props.args.icon} fixedWidth />}
          maxDropdownHeight={200}
        />
      ) : (
        <>
          {props.args.type === 'multi-select' && (
            <MultiSelect
              data={props.args.options}
              value={controller.field.value}
              name={controller.field.name}
              ref={controller.field.ref}
              onBlur={controller.field.onBlur}
              onChange={controller.field.onChange}
              disabled={props.args.disabled}
              searchable={props.args.searchable}
              label={props.args.label + ' (' + props.args.options.length + ')'}
              description={props.args.description}
              withAsterisk={props.args.required}
              clearable={props.args.clearable}
              icon={props.args.icon && <FontAwesomeIcon icon={props.args.icon} fixedWidth />}
              maxDropdownHeight={200}
            />
          )}
        </>
      )}
    </>
  );
};

export default FormSelect;
