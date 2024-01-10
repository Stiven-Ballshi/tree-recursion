import { useState } from "react";
import "./App.css";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "joi",
          children: [
            {
              name: "joi",
              children: [
                {
                  name: "joi",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "package-lock.json",
    },
    {
      name: "vite-config.json",
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[] | undefined;
};

function Entry({ entry, depth }: { entry: TEntry; depth: number }) {
  const [expanded, setIsExpanded] = useState<boolean>(false);
  return (
    <>
      {entry.children ? (
        <button onClick={() => setIsExpanded(!expanded)}>
          {expanded ? "-" : "+"}
          {entry.name}
        </button>
      ) : (
        entry.name
      )}
      <div>
        {expanded &&
          entry.children?.map((entry) => {
            return (
              <div
                style={{
                  paddingLeft: depth * 20,
                }}
              >
                <Entry entry={entry} depth={depth + 1} />
              </div>
            );
          })}
      </div>
    </>
  );
}

function App() {
  return (
    <div className="container">
      <span>
        {files.children.map((entry) => {
          return <Entry entry={entry} depth={0} />;
        })}
      </span>
    </div>
  );
}

export default App;
