/**
 * Minimal GitHub client for /studio: reads a file and commits several files at once
 * to the site repository. Pushing to main triggers the existing Pages deploy.
 */
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
    throw new Error(`GitHub ${res.status}: ${(detail as { message?: string }).message ?? res.statusText}`);
  }
  return res.json() as Promise<T>;
}

const repoPath = `/repos/${REPO.owner}/${REPO.name}`;

/** Confirms the token can push to the site repository. */
export async function checkAccess(token: string): Promise<{ login: string }> {
  const [user, repo] = await Promise.all([
    gh<{ login: string }>(token, "/user"),
    gh<{ permissions?: { push?: boolean } }>(token, repoPath),
  ]);
  if (!repo.permissions?.push) throw new Error(`This token can read ${REPO.name} but not write to it. Give it "Contents: Read and write".`);
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
