import { Fragment } from "react";
import { Input } from "@mantine/core";

interface ListProps {
  children: React.ReactNode;
  context: {
    list: string;
    filter: string;
    filters: { label: string; value: string }[];
    setFilter(value: string): void;
    search: string;
    setSearch(value: string): void;
  };
}

export const DataList: React.FC<ListProps> = ({children, context}) => {
  const { list, filter, filters, setFilter, search, setSearch} = context;

  return (
    <div className="DataList-root">
      <div className="DataList-container">
        <div className="DataList-filterBar">
          {filters.map((v, index) => (
            <Fragment key={index}>
              <div
              className="DataList-filterButtons"
                style={{
                  background: filter == v.value ? "#1971C2" : "",
                }}
                onClick={() => setFilter(v.value)}
              >
                {v.label}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="DataList-search">
          <Input
            style={{position: "relative", width: "100%", height: "100%"}}
            variant="underline"
            placeholder={`Type to filter ${list}`}
            radius="none"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          flex: 1,
          padding: 8,
          overflow: "hidden",
        }}>
          <div className="DataList-list">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
