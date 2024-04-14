import { Fragment, useState, useEffect } from "react";
import { Button, Divider, Stack, Group } from "@mantine/core";
import { useFieldArray, useForm } from "react-hook-form";
import { FormCheckbox, FormInput, FormNumber, FormSelect, FormAutoComplete, FormSlider } from "./components";
import type { FormCommandProps, ArgsProps } from "../../../../../types";
import { CommandLabel } from "../CommandLabel";
import Expand from "../../../../components/Expand";
import { fetchNui } from "../../../../../utils/fetchNui";

const FormCommand: React.FC<FormCommandProps> = (props) => {
  const { label, id, command, args, buttons, close, fav, setFav } = props;
  const [fields, setFields] = useState<ArgsProps>(props.args ? props.args : []);
  const form = useForm<{ test: { value: unknown }[] }>({});
  const fieldForm = useFieldArray({
    control: form.control,
    name: "test",
  });

  useEffect(() => {
    if (!args) return;
    fields.forEach((row, index) => {
      fieldForm.insert(index, {
          value: row.type !== "checkbox" ? row.default : row.checked,
        } || { value: null }
      );
    });
    setFields(args);
  }, [args]);

  const onSubmit = form.handleSubmit(async (data) => {
    const values: unknown[] = [];
    Object.values(data.test).forEach((obj: { value: unknown }) =>
      values.push(obj.value)
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    const stringValues = command + " " + values.join(" ");
    fetchNui("triggerCommand", stringValues);
    if (close) {
      fetchNui("closeMenu");
    }
  });

  return (
    <Expand label={
      <CommandLabel command_id={id} fav={fav} setFav={setFav}>
        {label}
      </CommandLabel>
    }>
      <form onSubmit={onSubmit}>
        <Stack gap="xs">
          {fieldForm.fields.map((row, index) => {
            const item = fields[index];
            return (
              <Fragment key={row.id}>
                {item.type === "checkbox" && (
                  <FormCheckbox
                    register={form.register(`test.${index}.value`, {
                      required: item.required,
                    })}
                    args={item}
                    index={index}
                  />
                )}
                {item.type === "input" && (
                  <FormInput
                    register={form.register(`test.${index}.value`, {
                      required: item.required,
                    })}
                    args={item}
                    index={index}
                  />
                )}
                {item.type === "number" && (
                  <FormNumber control={form.control} args={item} index={index} />
                )}
                {(item.type === "select" || item.type === "multi-select") && (
                  <FormSelect control={form.control} args={item} index={index} />
                )}
                {item.type === "autocomplete" && (
                  <FormAutoComplete control={form.control} args={item} index={index} />
                )}
                {item.type === "slider" && (
                  <FormSlider control={form.control} args={item} index={index} />
                )}
              </Fragment>
            );
          })}
        </Stack>
        <Divider my="sm" />
        <Group gap="xs">
          <Button variant="light" color="blue" type="submit">
            {buttons?.execute ? buttons.execute : "Execute"}
          </Button>
          {buttons?.extra?.map((v, index) => {
            return (
              <Fragment key={index}>
                <Button
                  key={index}
                  variant="light"
                  color={v.color}
                  onClick={() => {
                    fetchNui("triggerCommand", v.command);
                  }}
                >
                  {v.label}
                </Button>
              </Fragment>
            );
          })}
        </Group>
      </form>
    </Expand>
  );
};

export default FormCommand;
