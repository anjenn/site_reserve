type RuntimeGlobals = typeof globalThis & {
  Netlify?: {
    env?: {
      get(name: string): string | undefined;
    };
  };
  Deno?: {
    env?: {
      get(name: string): string | undefined;
    };
  };
};

type EdgeContext = {
  next(): Promise<Response>;
};

const runtime = globalThis as RuntimeGlobals;

const getEnv = (name: string) =>
  runtime.Netlify?.env?.get(name) ?? runtime.Deno?.env?.get(name);

const unauthorized = () =>
  new Response("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="NEST DANCE Admin", charset="UTF-8"',
    },
  });

const encodeBasicAuth = (username: string, password: string) =>
  `Basic ${btoa(`${username}:${password}`)}`;

const safeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
};

export default async (request: Request, context: EdgeContext) => {
  const username = getEnv("ADMIN_BASIC_USER");
  const password = getEnv("ADMIN_BASIC_PASSWORD");

  if (!username || !password) {
    return new Response("Admin authentication is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const expected = encodeBasicAuth(username, password);
  const received = request.headers.get("authorization") ?? "";

  if (!safeEqual(received, expected)) {
    return unauthorized();
  }

  const response = await context.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
};
