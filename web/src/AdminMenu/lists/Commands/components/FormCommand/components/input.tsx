import { createStyles, PasswordInput, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArgInput } from '../../../../../../types';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register: UseFormRegisterReturn;
  args: ArgInput;
  index: number;
}

const useStyles = createStyles((theme) => ({
  eyeIcon: {
    color: theme.colors.dark[2],
  },
}));

const InputField: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <>
      {!props.args.password ? (
        <TextInput
          {...props.register}
          defaultValue={props.args.default}
          label={props.args.label}
          description={props.args.description}
          icon={props.args.icon && <FontAwesomeIcon icon={props.args.icon} fixedWidth />}
          placeholder={props.args.placeholder}
          minLength={props.args.min}
          maxLength={props.args.max}
          disabled={props.args.disabled}
          withAsterisk={props.args.required}
        />
      ) : (
        <PasswordInput
          {...props.register}
          defaultValue={props.args.default}
          label={props.args.label}
          description={props.args.description}
          icon={props.args.icon && <FontAwesomeIcon icon={props.args.icon} fixedWidth />}
          placeholder={props.args.placeholder}
          minLength={props.args.min}
          maxLength={props.args.max}
          disabled={props.args.disabled}
          withAsterisk={props.args.required}
          visibilityToggleIcon={({ reveal, size }) => (
            <FontAwesomeIcon
              icon={reveal ? 'eye-slash' : 'eye'}
              fontSize={size}
              cursor="pointer"
              className={classes.eyeIcon}
              fixedWidth
            />
          )}
        />
      )}
    </>
  );
};

export default InputField;
