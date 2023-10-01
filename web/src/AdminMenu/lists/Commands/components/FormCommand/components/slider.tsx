import { Box, Slider, Text } from '@mantine/core';
import { Control, useController } from 'react-hook-form';
import { FormValues, ArgSlider } from '../../../../../../types';
interface Props {
  args: ArgSlider;
  index: number;
  control: Control<FormValues>;
}

const SliderField: React.FC<Props> = (props) => {
  const controller = useController({
    name: `test.${props.index}.value`,
    control: props.control,
    defaultValue: props.args.default || props.args.min || 0,
  });

  return (
    <Box>
      <Text sx={{ fontSize: 14, fontWeight: 500 }}>{props.args.label}</Text>
      <Slider
        mb={10}
        value={controller.field.value}
        name={controller.field.name}
        ref={controller.field.ref}
        onBlur={controller.field.onBlur}
        onChange={controller.field.onChange}
        defaultValue={props.args.default || props.args.min || 0}
        min={props.args.min}
        max={props.args.max}
        step={props.args.step}
        disabled={props.args.disabled}
        marks={[
          { value: props.args.min || 0, label: props.args.min || 0 },
          { value: props.args.max || 100, label: props.args.max || 100 },
        ]}
      />
    </Box>
  );
};

export default SliderField;
