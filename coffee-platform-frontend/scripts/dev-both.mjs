import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { platform } from "node:process";
import { fileURLToPath } from "node:url";

const isWindows = platform === "win32";
const npmCommand = isWindows ? "cmd.exe" : "npm";
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const apps = [
  { name: "customer", cwd: resolve(rootDir, "customer-frontend") },
  { name: "admin", cwd: resolve(rootDir, "admin-frontend") },
];

const children = apps.map((app) => {
  const args = isWindows ? ["/d", "/s", "/c", "npm.cmd run dev"] : ["run", "dev"];
  const child = spawn(npmCommand, args, {
    cwd: app.cwd,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (data) => {
    process.stdout.write(`[${app.name}] ${data}`);
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(`[${app.name}] ${data}`);
  });

  child.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      process.exitCode = code;
    }
  });

  return child;
});

function shutdown() {
  for (const child of children) {
    child.kill();
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
