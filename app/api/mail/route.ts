import { render } from "@react-email/render";

import WelcomeTemplate from "../../../emails";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Inicialização lazy para evitar erros durante o build
let resend: Resend | null = null;
let ratelimit: Ratelimit | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

function getRatelimit() {
  if (!ratelimit) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!redisUrl || !redisToken) {
      throw new Error("UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be configured");
    }

    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    ratelimit = new Ratelimit({
      redis,
      // 2 requests per minute from the same IP address in a sliding window of 1 minute duration which means that the window slides forward every second and the rate limit is reset every minute for each IP address.
      limiter: Ratelimit.slidingWindow(2, "1 m"),
    });
  }
  return ratelimit;
}

export async function POST(request: NextRequest, response: NextResponse) {
  const ip = request.ip ?? "127.0.0.1";

  const result = await getRatelimit().limit(ip);

  if (!result.success) {
    return Response.json(
      {
        error: "Too many requests!!",
      },
      {
        status: 429,
      },
    );
  }

  const { email, firstname } = await request.json();

  const { data, error } = await getResend().emails.send({
    from: "Premisses<hello@premisses.com>",
    to: [email],
    subject: "Obrigado por entrar na lista de espera do Premisses!",
    reply_to: "contato@premisses.com",
    html:  await render(WelcomeTemplate({ userFirstname: firstname })),
  });

  // const { data, error } = { data: true, error: null }

  if (error) {
    return NextResponse.json(error);
  }

  if (!data) {
    return NextResponse.json({ message: "Failed to send email" });
  }

  return NextResponse.json({ message: "Email sent successfully" });
}
