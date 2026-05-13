import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apps = [
  { name: "customer", cwd: resolve(rootDir, "customer-frontend") },
  { name: "admin", cwd: resolve(rootDir, "admin-frontend") },
];

const children = apps.map((app) => {
  const child = spawn("cmd.exe", ["/d", "/s", "/c", "npm.cmd run dev"], {
    cwd: app.cwd,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (data) => process.stdout.write(`[${app.name}] ${data}`));
  child.stderr.on("data", (data) => process.stderr.write(`[${app.name}] ${data}`));
  return child;
});

function shutdown() {
  for (const child of children) {
    child.kill();
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
