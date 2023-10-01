import { createStyles, Autocomplete  } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArgAutoComplete, FormValues } from '../../../../../../types';
import { Control, useController } from 'react-hook-form';
import { GetOptions } from '../../../options';

interface Props {
  args: ArgAutoComplete;
  index: number;
  control: Control<FormValues>;
}

const useStyles = createStyles((theme) => ({
  eyeIcon: {
    color: theme.colors.dark[2],
  },
}));

const FormAutoComplete: React.FC<Props> = (props) => {
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
      <Autocomplete
        data={props.args.options}
        value={controller.field.value}
        name={controller.field.name}
        ref={controller.field.ref}
        onChange={controller.field.onChange}
        disabled={props.args.disabled}
        label={props.args.label + ' (' + props.args.options.length + ')'}
        description={props.args.description}
        withAsterisk={props.args.required}
        icon={props.args.icon && <FontAwesomeIcon icon={props.args.icon} fixedWidth />}
        maxDropdownHeight={200}
      />
    </>
  );
};

export default FormAutoComplete;
