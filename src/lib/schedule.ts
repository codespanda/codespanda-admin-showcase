/** Studio items can carry a future `publishAt`; they stay hidden on the site until then. */
export function isLive(item: { publishAt?: string }, now = Date.now()) {
  return !item.publishAt || Date.parse(item.publishAt) <= now;
}
