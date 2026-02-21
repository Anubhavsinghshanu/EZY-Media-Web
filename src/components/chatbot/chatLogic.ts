// ─── Agency Config ──────────────────────────────────────────────────────────
export const AGENCY = {
    name: 'EZY MEDIA',
    whatsapp: '+919919119691',
    whatsappLink: 'https://wa.me/919919119691',
    email: 'contact@ezymedia.in',
};

// ─── Types ──────────────────────────────────────────────────────────────────
export type FlowStep =
    | 'idle'
    | 'ask_name'
    | 'ask_business'
    | 'ask_goal'
    | 'ask_budget'
    | 'ask_timeline'
    | 'ask_contact'
    | 'complete';

export interface ConversationContext {
    flow: FlowStep;
    lead: { name?: string; business?: string; goal?: string; budget?: string; timeline?: string; contact?: string; };
    history: string[];
    lastIntent: string;
    turnCount: number;
}

export interface BotReply {
    text: string;
    options?: string[];
}

// ─── Varied phrase helpers ───────────────────────────────────────────────────
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─── Intent Detection ────────────────────────────────────────────────────────
export type Intent =
    | 'greeting' | 'services' | 'pricing' | 'payment' | 'performance'
    | 'ads' | 'social_media' | 'influencer' | 'music' | 'branding'
    | 'lead_gen' | 'consultation' | 'human' | 'get_started' | 'thanks'
    | 'not_working' | 'comparison' | 'instagram' | 'youtube' | 'whatsapp_req'
    | 'email_req' | 'general_marketing' | 'ecommerce' | 'coach' | 'startup'
    | 'content' | 'seo' | 'funnel' | 'casual' | 'unknown';

const patterns: [Intent, RegExp][] = [
    ['greeting', /^(hi|hello|hey|hii|helo|hai|sup|yo|namaste|good (morning|evening|afternoon))\b/i],
    ['thanks', /\b(thanks|thank you|thx|ty|cheers|appreciate|helpful|great|perfect|awesome|wonderful)\b/i],
    ['not_working', /\b(not working|not getting|no results|isn.t working|wasting|failing|dropped|bad results|no leads|zero leads|underperform)\b/i],
    ['payment', /\b(pay|payment|upi|gpay|bank transfer|card|invoice|billing|international pay|wire|paypal|razorpay|cost to pay)\b/i],
    ['pricing', /\b(price|pricing|cost|how much|charges|fee|rate|package|plan|affordable|expensive|cheap|budget|quote)\b/i],
    ['ads', /\b(ad|ads|paid ad|meta ad|facebook ad|google ad|instagram ad|advertising|ppc|roas|run ad|ad campaign|ad spend|cpm|cpc|retargeting)\b/i],
    ['music', /\b(music|song|track|artist|album|spotify|soundcloud|singer|music video|label|music promotion|beats|rap|indie)\b/i],
    ['influencer', /\b(influencer|creator|ugc|collab|collaboration|creator network|brand deal|influencer marketing)\b/i],
    ['instagram', /\b(instagram|ig|insta|reels|stories|followers|grow instagram|instagram growth|instagram ads)\b/i],
    ['youtube', /\b(youtube|yt|shorts|video marketing|channel|subscribers|views|youtube ads|youtube growth)\b/i],
    ['branding', /\b(brand|branding|logo|identity|design|visual|creative|creative direction|brand story|brand kit)\b/i],
    ['lead_gen', /\b(lead|lead gen|leads|get clients|get customers|funnel|sales funnel|generate lead|b2b|pipeline)\b/i],
    ['social_media', /\b(social media|social media management|posting|content calendar|scheduling|manage social|smm|community management)\b/i],
    ['seo', /\b(seo|search engine|google ranking|keyword|organic traffic|rank on google|search optimization)\b/i],
    ['funnel', /\b(funnel|landing page|conversion rate|cro|sales page|checkout|squeeze page|email sequence|drip)\b/i],
    ['content', /\b(content|content creation|copywriting|caption|blog|video script|graphic|reel script|content strategy)\b/i],
    ['ecommerce', /\b(ecommerce|e-commerce|shopify|woocommerce|online store|product sell|dropship|d2c|direct to consumer)\b/i],
    ['coach', /\b(coach|coaching|mentor|course|workshop|online coach|life coach|business coach)\b/i],
    ['startup', /\b(startup|new business|just launched|early stage|mvp|fresh brand|bootstrapped|pre-revenue)\b/i],
    ['comparison', /\b(better than|vs |versus|compare|competitor|other agency|why choose|why you|different|alternative|unique)\b/i],
    ['performance', /\b(roi|roas|performance|result|analytics|report|metric|kpi|conversion|reach|engagement|impressions|data)\b/i],
    ['consultation', /\b(consult|free call|strategy call|book|schedule|appointment|demo|talk to expert|free audit|book a call)\b/i],
    ['human', /\b(talk to human|real person|agent|live chat|support team|speak to someone|connect me)\b/i],
    ['services', /\b(service|services|what do you do|what do you offer|offerings|capabilities|how can you help|work with)\b/i],
    ['get_started', /\b(get started|start|begin|sign up|onboard|interested|want to work|let.s go|ready|move forward|work together)\b/i],
    ['whatsapp_req', /\b(whatsapp|whats app|wa\.me|message on whatsapp|chat on wa)\b/i],
    ['email_req', /\b(email|send mail|contact email|drop a mail|reach by email)\b/i],
    ['general_marketing', /\b(marketing|digital marketing|strategy|grow|growth|social proof|awareness|viral|trending|campaign|promote)\b/i],
    ['casual', /^(ok|okay|hmm|nice|cool|sure|sounds good|make sense|i see|got it|alright|yep|yup|nope|lol|haha)\b/i],
];

export function detectIntent(input: string, history: string[]): Intent {
    for (const [intent, regex] of patterns) {
        if (regex.test(input)) return intent;
    }
    // context fallback — inherit from recent history
    for (const prev of history.slice(-2)) {
        for (const [intent, regex] of patterns) {
            if (regex.test(prev)) return intent;
        }
    }
    return 'unknown';
}

// ─── Response Generator ──────────────────────────────────────────────────────
export function generateReply(
    input: string,
    ctx: ConversationContext
): { reply: BotReply; nextCtx: ConversationContext } {
    const trimmed = input.trim();
    const lower = trimmed.toLowerCase();
    let nextCtx: ConversationContext = {
        ...ctx,
        history: [...ctx.history.slice(-5), trimmed],
        turnCount: ctx.turnCount + 1,
    };

    // ── Lead Capture Flow ─────────────────────────────────────────────────────
    if (ctx.flow === 'ask_name') {
        const name = trimmed.split(/\s+/)[0];
        nextCtx = { ...nextCtx, flow: 'ask_business', lead: { ...ctx.lead, name } };
        return {
            reply: { text: `Nice to meet you, ${name}! 👋\n\nTell me about your business or brand — what do you do, and who are you trying to reach?` },
            nextCtx,
        };
    }
    if (ctx.flow === 'ask_business') {
        nextCtx = { ...nextCtx, flow: 'ask_goal', lead: { ...ctx.lead, business: trimmed } };
        return {
            reply: {
                text: `Got it! And what's your **main goal** right now? Growing followers, generating leads, running ads, building a brand — or something else?`,
                options: ['📈 Grow social media', '🎯 Generate leads', '📢 Run paid ads', '🎵 Music campaign', '🎨 Build branding', '🚀 Scale business'],
            },
            nextCtx,
        };
    }
    if (ctx.flow === 'ask_goal') {
        nextCtx = { ...nextCtx, flow: 'ask_budget', lead: { ...ctx.lead, goal: trimmed } };
        return {
            reply: {
                text: `Perfect. What's your **rough monthly marketing budget?** Even a ballpark helps us point you in the right direction.`,
                options: ['Under ₹10K', '₹10K – ₹30K', '₹30K – ₹1L', '₹1L+', 'Not sure yet'],
            },
            nextCtx,
        };
    }
    if (ctx.flow === 'ask_budget') {
        nextCtx = { ...nextCtx, flow: 'ask_timeline', lead: { ...ctx.lead, budget: trimmed } };
        return {
            reply: {
                text: `And how soon are you looking to get started?`,
                options: ['Right away 🔥', 'Within a month', '1–3 months', 'Just exploring'],
            },
            nextCtx,
        };
    }
    if (ctx.flow === 'ask_timeline') {
        nextCtx = { ...nextCtx, flow: 'ask_contact', lead: { ...ctx.lead, timeline: trimmed } };
        return {
            reply: { text: `Almost done! Drop your **WhatsApp number or email** and our strategist will reach out within 24 hours with a plan built specifically for you. 🎯` },
            nextCtx,
        };
    }
    if (ctx.flow === 'ask_contact') {
        const name = ctx.lead.name ? `, ${ctx.lead.name}` : '';
        nextCtx = { ...nextCtx, flow: 'complete', lead: { ...ctx.lead, contact: trimmed } };
        return {
            reply: {
                text: `✅ **All set${name}!**\n\nOur team will reach out within 24 hours with something tailored specifically to your goals.\n\nMeanwhile, you can always reach us directly:\n📱 **WhatsApp:** ${AGENCY.whatsapp}\n📧 **Email:** ${AGENCY.email}`,
                options: ['💬 WhatsApp Now', '📧 Email Us'],
            },
            nextCtx,
        };
    }

    // ── Intent-Based Replies ──────────────────────────────────────────────────
    const intent = detectIntent(lower, ctx.history);
    nextCtx = { ...nextCtx, lastIntent: intent };

    switch (intent) {

        case 'greeting':
            return {
                reply: {
                    text: pick([
                        `Hey! 👋 Welcome to EZY MEDIA. I'm here to help — whether it's about services, strategy, campaigns, or just a question about marketing. What's on your mind?`,
                        `Hi there! 👋 Good to have you here. I'm the EZY MEDIA assistant — you can ask me anything about marketing, social media, campaigns, or how we work. What can I help you with?`,
                        `Hello! 👋 Welcome to EZY MEDIA. Happy to help with anything — marketing advice, service info, pricing, or anything else. What are you looking for?`,
                    ]),
                    options: ['💼 What do you offer?', '💰 Pricing', '📢 Run Ads for me', '🎵 Music Promotion', '📅 Book Free Call', '🤝 Talk to Team'],
                },
                nextCtx,
            };

        case 'casual':
            return {
                reply: {
                    text: pick([
                        `Haha, sure! 😄 Is there anything specific I can help you with — marketing, strategy, campaigns?`,
                        `Got it! 😊 Let me know if you have any questions — about services, marketing, or anything else.`,
                        `Sounds good! Anything you'd like to explore — strategy, services, pricing?`,
                    ]),
                    options: ['💼 Services', '💰 Pricing', '📅 Book Free Call'],
                },
                nextCtx,
            };

        case 'thanks':
            return {
                reply: {
                    text: pick([
                        `Happy to help! 😊 Anything else on your mind?`,
                        `Of course! That's what I'm here for. Anything else you'd like to know?`,
                        `Glad that was useful! Let me know if there's anything else I can help with.`,
                    ]),
                    options: ['📅 Book Free Call', '💼 See Services', '🤝 Talk to Team'],
                },
                nextCtx,
            };

        case 'not_working': {
            const followUp = ctx.lastIntent === 'ads'
                ? `Since you mentioned ads — the most common issues are targeting, weak creatives, or not enough budget for the algorithm to optimise. What platform are you running on?`
                : `That usually comes down to a few things — targeting, messaging, or the offer itself. Which part specifically isn't performing?`;
            return {
                reply: {
                    text: `That's frustrating — but genuinely fixable. 💪\n\n${followUp}\n\nHere are the most common culprits:\n\n🎯 **Wrong audience** — reaching people who were never going to buy\n🖼️ **Weak creative** — the ad or post isn't stopping the scroll\n🔗 **Broken funnel** — traffic arriving but not converting\n📊 **No testing** — not learning what actually works\n\nWe do free campaign audits if you'd like a proper look — no obligation.`,
                    options: ['✅ Yes, audit my campaign', '📅 Book Free Strategy Call', '💬 Tell me more'],
                },
                nextCtx,
            };
        }

        case 'services':
            return {
                reply: {
                    text: `At EZY MEDIA, we focus on things that actually move the needle:\n\n📱 **Social Media Management** — Content, scheduling, community building\n📢 **Paid Ads** — Meta, Google, Instagram — averaging 3–8x ROAS for clients\n🎵 **Music & Influencer Marketing** — 500+ verified creators across India\n🎨 **Branding & Content** — Premiumvisuals, copy, and identity\n💡 **Lead Generation** — High-converting ad funnels\n🚀 **Personal Brand Growth** — Authority building that compounds\n\nWhich of these is most relevant to what you're working on?`,
                    options: ['📢 Paid Ads', '🎵 Music/Influencer', '📱 Social Media', '🎨 Branding', '💡 Lead Gen', '📅 Free Strategy Call'],
                },
                nextCtx,
            };

        case 'pricing':
            return {
                reply: {
                    text: `Here's our pricing structure — and I'll be straight with you:\n\n🥉 **Starter** — ₹8,000/mo\nBest for brands just getting started — social media management + content\n\n🥈 **Growth** — ₹20,000/mo\nMost popular — ads + content + monthly performance reporting\n\n🥇 **Premium** — ₹50,000/mo\nFull-stack — management, ads, influencers, branding, dedicated manager\n\n🎯 **Custom** — Built around your specific goals and budget\n\nMost of our clients start on Growth and scale up once they see results. What's your situation like?`,
                    options: ['✅ Get Custom Quote', '📅 Book Free Call', '💳 Payment methods?'],
                },
                nextCtx,
            };

        case 'payment':
            return {
                reply: {
                    text: `Yes — we keep payments flexible:\n\n💙 **UPI** — GPay, PhonePe, Paytm (instant)\n🏦 **Bank Transfer** — NEFT / RTGS / IMPS\n💳 **Cards** — Visa, Mastercard, RuPay\n🌍 **International** — Wise, PayPal, SWIFT\n\nAll payments come with a **proper GST invoice**. We work on monthly retainers — paid at the start of each month.\n\nNeed a payment link or have a specific billing question?`,
                    options: ['💬 Get Payment Link', '📧 Email Finance Team', '📅 Book Consultation'],
                },
                nextCtx,
            };

        case 'ads':
            return {
                reply: {
                    text: `Paid ads — done right — are one of the fastest ways to grow. Here's how we approach it:\n\n📘 **Meta (Facebook + Instagram)** — lead gen, retargeting, awareness\n🔍 **Google** — search intent, display, YouTube pre-roll\n📸 **Instagram Ads** — Reels, Stories, Explore\n\nWe don't just run ads and hope — we test audiences, creatives, and offers systematically. Our clients average **3–8x ROAS** in the first 90 days.\n\nWhat industry are you in? I can tell you what's working right now.`,
                    options: ['✅ Suggest strategy for me', '📅 Free Ad Audit', '💰 Ad Pricing', '🎯 Lead Gen'],
                },
                nextCtx,
            };

        case 'music':
            return {
                reply: {
                    text: `Music promotion is honestly one of our strongest areas. 🎵\n\nWe've helped artists and labels get millions of streams through:\n\n📱 **Instagram Reels** campaigns with music creators (highest ROI right now)\n▶️ **YouTube Shorts** seeding for viral spread\n🎙️ **Creator challenges** — lip-sync, dance, reaction content\n📢 **Targeted ads** on Meta and YouTube\n\nThe key is matching your track's vibe with the right creator audience — not just blasting it everywhere.\n\nIs this for a single, album, or ongoing promotion?`,
                    options: ['🎵 Plan my music campaign', '📅 Book Strategy Call', '💰 Music Promo Pricing'],
                },
                nextCtx,
            };

        case 'influencer':
            return {
                reply: {
                    text: `Influencer marketing really works when it's done strategically — not just sending products to random people with followers.\n\nOur approach:\n\n🤝 We have **500+ verified Indian creators** across niches\n🎯 We match creators based on **audience overlap**, not just size\n📋 We handle briefs, approvals, tracking — end to end\n📊 And we measure real outcomes — reach, clicks, conversions\n\nWhat kind of product or brand are you looking to promote?`,
                    options: ['🛍️ Product/E-commerce', '🎵 Music Artist', '👤 Personal Brand', '📅 Book Free Call'],
                },
                nextCtx,
            };

        case 'instagram':
            return {
                reply: {
                    text: `Instagram right now heavily favours **Reels** — they get significantly more organic reach than photos or carousels.\n\nFor growth, the formula is:\n\n🎬 **Reels 4–5x per week** with strong hooks in the first 2 seconds\n🎯 **Niche-specific content** (broad content gets ignored)\n💬 **Community engagement** — replying to comments, DMs, stories\n📢 **Instagram Ads** to amplify what's already working organically\n\nAre you growing a personal brand or a business account?`,
                    options: ['👤 Personal brand', '🏢 Business account', '📢 Run Instagram Ads', '📅 Get a Free Strategy'],
                },
                nextCtx,
            };

        case 'youtube':
            return {
                reply: {
                    text: `YouTube is one of the best long-term plays for any brand — content there compounds over time unlike any other platform.\n\n**Shorts** right now are the fastest way to grow — they're getting massive algorithmic push.\n\nFor longer content, the fundamentals are:\n🔍 Strong SEO in title, description, and tags\n🖼️ High click-through thumbnails\n🪝 Strong hook in the first 30 seconds\n📅 Consistency — 2x per week minimum\n\nAre you trying to grow a channel from scratch or promote specific videos?`,
                    options: ['📈 Grow my channel', '🎵 Promote music video', '📢 YouTube Ads', '📅 Book Strategy Call'],
                },
                nextCtx,
            };

        case 'branding':
            return {
                reply: {
                    text: `Good branding does one thing — it makes people remember you. And in a crowded market, that's everything.\n\nOur branding work includes:\n\n🎨 Logo + visual identity design\n✍️ Brand voice and messaging\n📸 Social media template kit\n🎬 Content production (Reels, videos)\n📝 Copywriting across all platforms\n\nIs this for a **brand new launch** or refreshing something that already exists?`,
                    options: ['✨ New brand launch', '🔄 Refresh existing brand', '📅 Book Consultation', '💰 Pricing'],
                },
                nextCtx,
            };

        case 'lead_gen':
            return {
                reply: {
                    text: `Lead gen is all about getting the right people to raise their hand — not just traffic for its own sake.\n\nOur approach typically looks like:\n\n🎯 **Targeted paid ads** → qualified audience\n📄 **Optimised landing page** → high conversion rate\n📱 **WhatsApp / email follow-up** → nurture and close\n🔄 **Retargeting** → re-engage warm leads\n\nWe've done this for coaching, real estate, finance, and e-commerce clients with consistent results.\n\nWhat industry are you in? That changes the strategy quite a bit.`,
                    options: ['🏋️ Fitness/Coaching', '🏠 Real Estate', '💰 Finance', '🛍️ E-commerce', '📅 Free Strategy Call'],
                },
                nextCtx,
            };

        case 'social_media':
            return {
                reply: {
                    text: `Social media management is more than just posting — it's building a presence that people actually care about.\n\nWhat we handle:\n\n📅 Content calendar and scheduling\n🎨 Graphics, Reels, and video content\n✍️ Captions and hashtag strategy\n💬 Community management (comments, DMs)\n📊 Monthly analytics and reporting\n\nYou focus on running your business — we handle the content and growth.\n\nHow active are you currently on social media?`,
                    options: ['Just starting out', 'Posting inconsistently', 'Active but not growing', '📅 Get a free audit'],
                },
                nextCtx,
            };

        case 'content':
            return {
                reply: {
                    text: `Content is the foundation of everything in digital marketing — and most brands underinvest in it.\n\nWe create:\n\n🎬 **Reels and short videos** — highest organic reach right now\n🖼️ **Graphics + carousels** — educational and authority content\n✍️ **Captions + copy** — that actually makes people stop and read\n📝 **Long-form content** — for SEO and thought leadership\n\nThe key is creating content with a clear purpose — not just filling a content calendar.\n\nWhat platform are you primarily focused on?`,
                    options: ['📸 Instagram', '▶️ YouTube', '💼 LinkedIn', '📅 Get Content Strategy'],
                },
                nextCtx,
            };

        case 'seo':
            return {
                reply: {
                    text: `SEO is a longer game but one of the highest ROI channels when done right.\n\nHonestly — for most of our clients in India, social media and paid ads deliver faster results. But SEO is powerful for building organic, compounding traffic over time.\n\nIf you're thinking about SEO, the key pillars are:\n🔍 Keyword research aligned to buying intent\n📝 Content that answers real questions\n🔗 Quality backlinks\n⚙️ Technical site health\n\nAre you thinking about SEO as part of a broader strategy, or is that your main focus?`,
                    options: ['SEO + Social combo', 'SEO only', '📅 Book Strategy Call', '💼 See All Services'],
                },
                nextCtx,
            };

        case 'funnel':
            return {
                reply: {
                    text: `A strong funnel is what turns traffic into actual revenue — without it, even great ads won't perform well.\n\nA typical high-converting funnel:\n\n1️⃣ **Awareness** — Ad or content reaches the right person\n2️⃣ **Interest** — Landing page with a clear, compelling offer\n3️⃣ **Action** — Low friction CTA (WhatsApp, form, call)\n4️⃣ **Follow-up** — Nurture via WhatsApp or email\n5️⃣ **Close** — Convert to sale or appointment\n\nMost leaks happen at the landing page or follow-up stage. Where do you think yours is losing people?`,
                    options: ['Landing page issues', 'No follow-up system', '📅 Free Funnel Audit', '💡 Lead Gen Service'],
                },
                nextCtx,
            };

        case 'ecommerce':
            return {
                reply: {
                    text: `E-commerce is a great space — and also a competitive one. The brands that win focus on a few key things:\n\n🎯 **Highly targeted Meta ads** — product audiences, lookalikes, retargeting\n📸 **Strong creatives** — UGC style content converts much better than studio shots\n🔄 **Retargeting** — most people don't buy on first visit\n⭐ **Social proof** — reviews, creator content, testimonials\n\nWhat are you selling and what's working (or not working) right now?`,
                    options: ['📢 Run E-commerce Ads', '🤝 Creator UGC Content', '📅 Free Strategy Call', '💰 Pricing'],
                },
                nextCtx,
            };

        case 'coach':
            return {
                reply: {
                    text: `Coaching businesses are one of the best fits for digital marketing — high margins, scalable, and personal brands convert incredibly well.\n\nFor coaches, what tends to work best:\n\n📢 **Meta lead gen ads** → direct to a WhatsApp or booking page\n👤 **Personal brand content** — people buy from people they trust\n🎥 **Short video** — Reels and Shorts build trust fast\n📧 **Email/WhatsApp nurture** — for higher ticket offers\n\nAre you doing 1:1 coaching, group programs, or online courses?`,
                    options: ['1:1 Coaching', 'Group Program', 'Online Course', '📅 Free Strategy Call'],
                },
                nextCtx,
            };

        case 'startup':
            return {
                reply: {
                    text: `Exciting — startups are one of the most fun brands to work with. The challenge is usually figuring out where to focus first without burning budget.\n\nFor early-stage brands, I'd typically recommend:\n\n1. **Nail your positioning** before spending on ads — who are you for, and what makes you different?\n2. **Build organic social proof** first — even 1,000 genuine followers matters\n3. **Then run targeted paid ads** once you know what message converts\n\nWhat stage are you at? Pre-launch, just launched, or some traction already?`,
                    options: ['Pre-launch', 'Just launched', 'Some traction', '📅 Book Strategy Call'],
                },
                nextCtx,
            };

        case 'comparison':
            return {
                reply: {
                    text: `Fair question — you should be comparing before committing.\n\nHere's what's honestly different about EZY MEDIA:\n\n🎵 **Music & creator network** — 500+ verified Indian creators, which most agencies don't have\n📊 **Transparent reporting** — we show you real numbers, not vanity metrics\n🎯 **Custom strategies** — no cookie-cutter campaigns; everything is built for your specific brand\n💬 **Dedicated manager** — you always have a real person to talk to\n🇮🇳 **India-first** — we know the Indian market and what actually works here\n\nWhat matters most to you in an agency relationship?`,
                    options: ['Results & ROI', 'Transparent communication', 'Creative quality', '📅 Let\'s talk strategy'],
                },
                nextCtx,
            };

        case 'performance':
            return {
                reply: {
                    text: `Good question — a lot of agencies hide behind vanity numbers. Here's what we actually track:\n\n📈 **ROI / ROAS** — return on every rupee spent\n🎯 **Cost per lead / Cost per acquisition** — how efficient is the spend?\n❤️ **Engagement rate** — are people actually caring about the content?\n👁️ **Reach vs impressions** — how many unique people saw it\n🔄 **Conversion rate** — what % of traffic is taking action\n\nAll our clients get **weekly dashboards** with plain-English summaries — no jargon.\n\nAre you currently tracking specific metrics you're unhappy with?`,
                    options: ['Yes, my ads are underperforming', 'I want better analytics', '📅 Free Campaign Audit', '💼 Our Services'],
                },
                nextCtx,
            };

        case 'consultation': {
            nextCtx = { ...nextCtx, flow: 'ask_name' };
            return {
                reply: {
                    text: `Let's set that up! 🚀\n\nOur free strategy calls are 30 minutes and genuinely useful — we'll look at your current situation, identify what's working or not, and give you a clear plan with realistic numbers.\n\nNo pitch, no pressure — just a real conversation.\n\nTo get started, what's your name?`,
                },
                nextCtx,
            };
        }

        case 'human':
            return {
                reply: {
                    text: `No problem at all — you can reach the team directly:\n\n📱 **WhatsApp:** ${AGENCY.whatsapp}\n📧 **Email:** ${AGENCY.email}\n\nWe're available Mon–Sat, 10am–7pm IST. WhatsApp is fastest — usually a response within a couple of hours.\n\nAnything else I can help with before you reach out?`,
                    options: ['💬 WhatsApp Now', '📧 Email Us'],
                },
                nextCtx,
            };

        case 'get_started': {
            nextCtx = { ...nextCtx, flow: 'ask_name' };
            return {
                reply: {
                    text: `Love that! Let's do this. 🎯\n\nI'll collect a few quick details so our team can put together something specifically for you — shouldn't take more than 2 minutes.\n\nFirst, what's your name?`,
                },
                nextCtx,
            };
        }

        case 'whatsapp_req':
            return {
                reply: {
                    text: `You can reach us on WhatsApp at **${AGENCY.whatsapp}**. We reply within a few hours on business days.\n\nTap the button below to open it directly 👇`,
                    options: ['💬 WhatsApp Now', '📧 Email Instead'],
                },
                nextCtx,
            };

        case 'email_req':
            return {
                reply: {
                    text: `Sure! Our email is **${AGENCY.email}**.\n\nWe respond within 24 hours on business days. For faster replies, WhatsApp is better — same team, quicker response.`,
                    options: ['💬 WhatsApp Instead', '📅 Book Strategy Call'],
                },
                nextCtx,
            };

        case 'general_marketing':
            return {
                reply: {
                    text: `Happy to dig into that. Marketing in 2025 is moving fast — what's specifically on your mind?\n\nI can talk through strategy, what's working on different platforms, ad approaches, content, funnels — whatever's relevant to your situation.`,
                    options: ['📢 Paid Ads Strategy', '📱 Social Media', '🎯 Lead Generation', '📅 Book Strategy Call'],
                },
                nextCtx,
            };

        case 'unknown':
        default:
            return {
                reply: {
                    text: pick([
                        `Hmm, could you clarify what you mean? I want to make sure I'm actually helpful, not just guessing. 😊`,
                        `I want to make sure I understand correctly — could you rephrase that or give me a bit more context?`,
                        `Let me make sure I'm on the right track — what specifically are you trying to figure out?`,
                    ]),
                    options: ['💼 Services', '💰 Pricing', '📅 Book Free Call', '🤝 Talk to Team'],
                },
                nextCtx,
            };
    }
}

// ─── Option Text Resolver ────────────────────────────────────────────────────
export function resolveOptionText(option: string): string {
    const map: Record<string, string> = {
        '💬 WhatsApp Now': '__whatsapp__',
        '📧 Email Us': '__email__',
        '💬 Get Payment Link': '__whatsapp__',
        '📧 Email Finance Team': '__email__',
        '💼 What do you offer?': 'Tell me about your services',
        '💼 Services': 'Tell me about your services',
        '💼 See Services': 'Tell me about your services',
        '💼 See All Services': 'Tell me about your services',
        '📅 Book Free Call': 'I want to book a free strategy call',
        '📅 Book Strategy Call': 'I want to book a strategy call',
        '📅 Book Free Strategy Call': 'I want to book a free strategy call',
        '📅 Book Consultation': 'I want to book a consultation',
        '📅 Free Strategy Call': 'I want a free strategy call',
        '📅 Free Ad Audit': 'I want a free ad audit',
        '📅 Free Funnel Audit': 'I want a free funnel audit',
        '📅 Free Campaign Audit': 'I want a free campaign audit',
        '📅 Get a Free Strategy': 'I want a free strategy',
        '📅 Get a free audit': 'I want a free audit',
        '✅ Get Custom Quote': "I'm interested in a custom quote",
        '✅ Suggest strategy for me': 'Please suggest a strategy for my business',
        '✅ Yes, audit my campaign': 'Yes, please audit my campaign',
        '📢 Run Ads for me': 'Tell me about your paid advertising services',
        '📢 Paid Ads': 'Tell me about paid ads',
        '📢 Run E-commerce Ads': 'Tell me about e-commerce advertising',
        '📢 Run Instagram Ads': 'Tell me about Instagram ads',
        '📢 YouTube Ads': 'Tell me about YouTube ads',
        '🎵 Music Promotion': 'Tell me about music promotion',
        '🎵 Music/Influencer': 'Tell me about music and influencer marketing',
        '🎵 Plan my music campaign': 'I want to plan a music campaign',
        '🎵 Promote music video': 'I want to promote my music video',
        '📱 Social Media': 'Tell me about social media management',
        '📱 Social Media Mgmt': 'Tell me about social media management',
        '🎨 Branding': 'Tell me about branding services',
        '🎨 Build branding': 'I want to build my brand',
        '💡 Lead Gen': 'Tell me about lead generation',
        '💡 Lead Gen Service': 'Tell me about your lead generation service',
        '🚀 Scale business': 'I want to scale my business',
        '🎯 Lead Generation': 'Tell me about lead generation',
        '🎯 Generate leads': 'My goal is to generate more leads',
        '📈 Grow social media': 'My goal is to grow on social media',
        '📈 Grow my channel': 'I want to grow my YouTube channel',
        '💳 Payment methods?': 'What payment methods do you accept?',
        '🤝 Talk to Team': 'I want to talk to the team directly',
        '🤝 Creator UGC Content': 'Tell me about UGC and creator content',
        '💬 Tell me more': 'Tell me more about that',
        'Under ₹10K': 'My budget is under ₹10,000 per month',
        '₹10K – ₹30K': 'My budget is ₹10,000 to ₹30,000 per month',
        '₹30K – ₹1L': 'My budget is ₹30,000 to ₹1,00,000 per month',
        '₹1L+': 'My budget is over ₹1 lakh per month',
        'Not sure yet': "I'm not sure about my budget yet",
        'Right away 🔥': 'I want to start right away',
        'Within a month': 'I can start within a month',
        '1–3 months': 'I plan to start in 1 to 3 months',
        'Just exploring': "I'm just exploring options for now",
        'SEO + Social combo': 'I want to do SEO and social media together',
        'SEO only': 'I want to focus on SEO',
        'Landing page issues': 'My landing page has conversion issues',
        'No follow-up system': "I don't have a follow-up system",
        '1:1 Coaching': 'I do 1 to 1 coaching',
        'Group Program': 'I run group coaching programs',
        'Online Course': 'I sell online courses',
        'Pre-launch': "I'm at the pre-launch stage",
        'Just launched': 'I just launched my brand',
        'Some traction': 'I have some traction already',
        'Just starting out': "I'm just starting out on social media",
        'Posting inconsistently': "I'm posting but inconsistently",
        'Active but not growing': "I'm active on social media but not growing",
        '👤 Personal brand': 'I want to grow my personal brand',
        '🏢 Business account': 'I run a business account',
        '🛍️ Product/E-commerce': 'I have a product or e-commerce brand',
        '🎵 Music Artist': 'I am a music artist',
        '✨ New brand launch': 'I want to launch a new brand',
        '🔄 Refresh existing brand': 'I want to refresh my existing brand',
        '📊 See Case Studies': 'Show me your results and case studies',
        'Yes, my ads are underperforming': 'My ads are not performing well',
        'I want better analytics': 'I want better analytics and reporting',
        "Results & ROI": 'I care most about results and ROI',
        'Transparent communication': 'I care most about transparent communication',
        'Creative quality': 'I care most about creative quality',
        "📅 Let's talk strategy": 'I want to talk strategy',
        '🏋️ Fitness/Coaching': 'I run a fitness or coaching business',
        '🏠 Real Estate': 'I work in real estate',
        '💰 Finance': 'I work in finance',
        '💰 Pricing': 'What are your pricing plans?',
        '💰 Music Promo Pricing': 'What does music promotion cost?',
        '💰 Ad Pricing': "What's the pricing for paid ads?",
        '📸 Instagram': 'I want to focus on Instagram',
        '▶️ YouTube': 'I want to focus on YouTube',
        '💼 LinkedIn': 'I want to focus on LinkedIn',
        '📢 Paid Ads Strategy': 'Tell me about paid ads strategy',
    };
    return map[option] ?? option;
}

export function isExternal(opt: string): 'whatsapp' | 'email' | null {
    const resolved = resolveOptionText(opt);
    if (resolved === '__whatsapp__') return 'whatsapp';
    if (resolved === '__email__') return 'email';
    return null;
}
