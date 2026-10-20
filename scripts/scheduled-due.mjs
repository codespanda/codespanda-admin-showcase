// Run by the hourly scheduled workflow: prints due=true when a studio item's
// publishAt fell within the last few hours, so the site is rebuilt and the item
// gets its static page, preview tags and sitemap entry. The window is generous
// because GitHub can start scheduled runs late; a due item may rebuild twice.
import { readFileSync, appendFileSync } from "fs";

const WINDOW_MS = 3 * 60 * 60 * 1000;
const now = Date.now();
const items = ["src/content/portfolio.json", "src/content/blog.json"].flatMap((f) => JSON.parse(readFileSync(f, "utf8")));
const due = items.filter((i) => i.publishAt && Date.parse(i.publishAt) <= now && now - Date.parse(i.publishAt) < WINDOW_MS);

for (const i of due) console.log(`Due: ${i.title} (${i.publishAt})`);
const line = `due=${due.length > 0}\n`;
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, line);
else process.stdout.write(line);
