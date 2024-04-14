import { Checkbox } from "@mantine/core";
import { UseFormRegisterReturn } from "react-hook-form";
import { ArgCheckbox } from "../../../../../../types";

interface Props {
  args: ArgCheckbox;
  index: number;
  register: UseFormRegisterReturn;
}

const FormCheckbox: React.FC<Props> = (props) => {
  return (
    <Checkbox
      {...props.register}
      required={props.args.required}
      label={props.args.label}
      defaultChecked={props.args.checked}
      disabled={props.args.disabled}
    />
  );
};

export default FormCheckbox;
