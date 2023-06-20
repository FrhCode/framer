export const revalidate = 300;
import path from "path";
import fs from "fs";
import Link from "next/link";

const FRAMER_PATH_0 = path.join(process.cwd(), "app", "(framer)");
const FRAMER_PATH_1 = path.join(
  process.cwd(),
  "app",
  "(framer-without-layout)"
);

function getDirectories(): string[] {
  const directories: string[] = [];

  const entries_0 = fs.readdirSync(FRAMER_PATH_0, { withFileTypes: true });
  const entries_1 = fs.readdirSync(FRAMER_PATH_1, { withFileTypes: true });
  for (const entry of [...entries_0, ...entries_1]) {
    if (entry.isDirectory()) {
      directories.push(entry.name);
    }
  }

  return directories;
}
export default function Home() {
  const urls = getDirectories();

  return (
    <div>
      <p>Belajar Framer</p>
      <ul>
        {urls.map((url) => (
          <li key={url}>
            <Link href={url}>{url}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
