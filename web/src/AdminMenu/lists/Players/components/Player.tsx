import { Button, Group, Stack, Divider } from "@mantine/core";
import { PlayerProps } from "../../../../types";
import Expand from "../../../components/Expand";
import { fetchNui } from "../../../../utils/fetchNui";

const Player: React.FC<PlayerProps> = (props) => {
  const { source, label, headshot, framework } = props;

  const triggerCommand = (command: string) => {
    fetchNui("triggerCommand", `${command} ${source}`);
  };

  const headshotStyle: React.CSSProperties = {
    position: "inherit",
    height: "100%",
    left: -8
  };
  const headshotString = `https://nui-img/${headshot}/${headshot}?v=${Date.now()}`;

  return (
    <Expand label={
      <>
        <img style={headshotStyle} src={headshotString} />
        {label}
      </>
    }>
      {(framework) && (
        <div style={{fontSize: 15}}>
          <Stack gap="sm">
            <div>Fullname: {framework.firstname} {framework.lastname}</div>
            <div>Job: {framework.job} | {framework.jobGrade}</div>
            <div>Gang: {framework.gang} | {framework.gangGrade}</div>
            <div>Money: Cash: {framework.cash} | Bank: {framework.bank}</div>
          </Stack>
        </div>
      )}
      <Divider my="sm" />
      <Group gap="xs">
        <Button variant="light" color="blue" onClick={() => triggerCommand("revive")}>
          Revive
        </Button>
        <Button variant="light" color="red" onClick={() => triggerCommand("kill")}>
          Kill
        </Button>
        <Button variant="light" color="red" onClick={() => triggerCommand("kick")}>
          Kick
        </Button>
        <Button variant="light" color="red" onClick={() => triggerCommand("ban")}>
          Ban
        </Button>
      </Group>
    </Expand>
  );
};

export default Player;