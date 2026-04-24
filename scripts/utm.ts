#!/usr/bin/env node
/**
 * UTM helper — generates compliant UTM-tagged URLs from arguments.
 *
 * Usage:
 *   pnpm utm --url=https://example.com/signup --source=x --campaign=build-log --content=n-019
 *
 * Outputs the tagged URL to stdout. Designed to be called from the publishing
 * tool or from your clipboard workflow.
 *
 * Rules (per docs/doctrine/marketing.md):
 *   - source must be in the active channels roster (see marketing/CHANNELS.md)
 *   - medium is inferred from source; override only with --medium=<value>
 *   - campaign is required
 *   - content is required (node ID like 'n-019' or a post slug)
 *
 * This is v1.2 template scaffolding. Ship with marketing doctrine enabled.
 */

// Source-to-medium mapping derived from marketing/CHANNELS.md defaults.
// When adding a channel to CHANNELS.md, also add it here.
const SOURCE_TO_MEDIUM: Record<string, string> = {
  blog: "referral",
  x: "social",
  linkedin: "social",
  newsletter: "email",
  reddit: "community",
  hackernews: "community",
  indiehackers: "community",
  producthunt: "community",
};

interface UtmArgs {
  url: string;
  source: string;
  medium?: string;
  campaign: string;
  content: string;
}

function parseArgs(argv: string[]): UtmArgs {
  const args: Record<string, string> = {};
  for (const arg of argv.slice(2)) {
    if (!arg.startsWith("--")) continue;
    const [key, ...valueParts] = arg.slice(2).split("=");
    args[key] = valueParts.join("=");
  }

  const required = ["url", "source", "campaign", "content"];
  for (const key of required) {
    if (!args[key]) {
      console.error(`Missing required argument: --${key}=<value>`);
      process.exit(1);
    }
  }

  if (!SOURCE_TO_MEDIUM[args.source] && !args.medium) {
    console.error(
      `Unknown source "${args.source}". Either add to marketing/CHANNELS.md and update SOURCE_TO_MEDIUM in this script, or pass --medium=<value> explicitly.`,
    );
    process.exit(1);
  }

  return {
    url: args.url,
    source: args.source,
    medium: args.medium ?? SOURCE_TO_MEDIUM[args.source],
    campaign: args.campaign,
    content: args.content,
  };
}

function buildUtmUrl(args: UtmArgs): string {
  const url = new URL(args.url);
  url.searchParams.set("utm_source", args.source);
  url.searchParams.set("utm_medium", args.medium!);
  url.searchParams.set("utm_campaign", args.campaign);
  url.searchParams.set("utm_content", args.content);
  return url.toString();
}

function main() {
  const args = parseArgs(process.argv);
  console.log(buildUtmUrl(args));
}

main();
