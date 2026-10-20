/**
 * Minimal GitHub client for /studio: reads a file and commits several files at once
 * to the site repository. Pushing to main triggers the existing Pages deploy.
 */
/** The only GitHub account allowed to use /studio. */
export const STUDIO_LOGIN = "codespanda";

export const REPO = { owner: "codespanda", name: "codespanda-admin-showcase", branch: "main" };

const API = "https://api.github.com";
const TOKEN_KEY = "cp-studio-token";

export function loadToken(): string {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveToken(token: string, remember: boolean) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    if (remember) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable: the token lives only for this page view */
  }
}

export function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

async function gh<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(explain(res.status, (detail as { message?: string }).message ?? res.statusText, path, init.method ?? "GET"));
  }
  return res.json() as Promise<T>;
}

const repoPath = `/repos/${REPO.owner}/${REPO.name}`;
const TOKENS_URL = "https://github.com/settings/personal-access-tokens";

/** Turns GitHub's terse permission errors into what to change on the token. */
function explain(status: number, message: string, path: string, method: string) {
  const fix = `Edit the token at ${TOKENS_URL}`;
  if (status === 401) return `GitHub rejected this token (it may have expired or been revoked). Create a new one at ${TOKENS_URL}.`;
  if (status === 403 && /not accessible by personal access token/i.test(message)) {
    if (path.includes("/actions/")) return `The token can't read GitHub Actions. ${fix} and set "Actions" to "Read-only".`;
    if (method !== "GET") return `The token can read ${REPO.name} but not save to it. ${fix} and set "Contents" to "Read and write".`;
    return `The token can't read the files in ${REPO.name}. ${fix} and set "Contents" to "Read and write".`;
  }
  if (status === 404 && path.startsWith(repoPath))
    return `The token can't see ${REPO.owner}/${REPO.name}. ${fix}: under "Repository access" choose "Only select repositories" and add ${REPO.name}.`;
  return `GitHub ${status}: ${message}`;
}

/**
 * Confirms the token can read and write the site repository. GitHub only reports
 * the account's own permissions, not the token's, so this reads a content file and
 * creates an unused blob (harmless; GitHub discards it) to prove write access.
 */
export async function checkAccess(token: string): Promise<{ login: string }> {
  const user = await gh<{ login: string }>(token, "/user");
  // The studio is for the site owner only, even if other accounts can write to the repository.
  if (user.login.toLowerCase() !== STUDIO_LOGIN) {
    throw new Error(`This studio is only for the ${STUDIO_LOGIN} GitHub account. You're signed in as ${user.login}.`);
  }
  await gh(token, repoPath);
  await gh(token, `${repoPath}/contents/src/content/portfolio.json?ref=${REPO.branch}`);
  await gh(token, `${repoPath}/git/blobs`, { method: "POST", body: JSON.stringify({ content: "studio access check", encoding: "utf-8" }) });
  return user;
}

/** Text of a file on the branch, read from the API so it's never a stale CDN copy. */
export async function readText(token: string, path: string): Promise<string> {
  const file = await gh<{ content: string }>(token, `${repoPath}/contents/${path}?ref=${REPO.branch}`);
  const bytes = Uint8Array.from(atob(file.content.replace(/\n/g, "")), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export interface CommitFile {
  path: string;
  /** Text content, or base64 for binary files. null deletes the file. */
  content: string | null;
  encoding: "utf-8" | "base64";
}

/** Writes all files in a single commit on top of the branch head. */
export async function commitFiles(token: string, message: string, files: CommitFile[]): Promise<string> {
  const ref = await gh<{ object: { sha: string } }>(token, `${repoPath}/git/ref/heads/${REPO.branch}`);
  const head = ref.object.sha;
  const commit = await gh<{ tree: { sha: string } }>(token, `${repoPath}/git/commits/${head}`);

  const tree: { path: string; mode: string; type: string; sha: string | null }[] = [];
  for (const f of files) {
    if (f.content === null) {
      tree.push({ path: f.path, mode: "100644", type: "blob", sha: null });
      continue;
    }
    const blob = await gh<{ sha: string }>(token, `${repoPath}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: f.content, encoding: f.encoding }),
    });
    tree.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
  }

  const newTree = await gh<{ sha: string }>(token, `${repoPath}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: commit.tree.sha, tree }),
  });
  const newCommit = await gh<{ sha: string }>(token, `${repoPath}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [head] }),
  });
  await gh(token, `${repoPath}/git/refs/heads/${REPO.branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: newCommit.sha }),
  });
  return newCommit.sha;
}

export interface DeployRun {
  status: string;
  conclusion: string | null;
  html_url: string;
  head_sha: string;
}

/** The latest deploy workflow run, to show whether the change is live yet. */
export async function latestDeploy(token: string): Promise<DeployRun | undefined> {
  const data = await gh<{ workflow_runs: DeployRun[] }>(token, `${repoPath}/actions/runs?branch=${REPO.branch}&per_page=1`);
  return data.workflow_runs[0];
}
