import { NumberInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Control, useController } from 'react-hook-form';
import { FormValues, ArgNumber } from '../../../../../../types';

interface Props {
  args: ArgNumber;
  index: number;
  control: Control<FormValues>;
}

const FormNumber: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.args.default,
    rules: { required: props.args.required, min: props.args.min, max: props.args.max },
  });

  return (
    <NumberInput
      value={controller.field.value}
      name={controller.field.name}
      ref={controller.field.ref}
      onBlur={controller.field.onBlur}
      onChange={controller.field.onChange}
      label={props.args.label}
      description={props.args.description}
      defaultValue={props.args.default}
      min={props.args.min}
      max={props.args.max}
      precision={props.args.precision}
      step={props.args.step}
      disabled={props.args.disabled}
      icon={props.args.icon && <FontAwesomeIcon icon={props.args.icon} fixedWidth />}
      withAsterisk={props.args.required}
    />
  );
};

export default FormNumber;
