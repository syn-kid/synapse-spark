"use client";

import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PrototypeSwitcher from "./PrototypeSwitcher";

export default function PricingPage() {
  return (
    <Suspense fallback={<PricingShell />}>
      <PricingContent />
    </Suspense>
  );
}

function PricingContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant") ?? "A";

  return (
    <>
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      <PrototypeSwitcher />
    </>
  );
}

// Shared pricing data
const PLANS = [
  {
    label: "个人版",
    enLabel: "Individual",
    credits: 100,
    price: "29",
    description: "适合个人创作者进行灵感探索与总结分析",
    cta: "立即开通",
    accent: "purple" as const,
  },
  {
    label: "团队版",
    enLabel: "Company",
    credits: 500,
    price: "99",
    description: "适合中小团队协作，共享积分与报告导出",
    cta: "立即开通",
    accent: "pink" as const,
  },
  {
    label: "企业版",
    enLabel: "Enterprise",
    credits: 2000,
    price: "499",
    description: "适合大型组织，定制词库与专属数据洞察",
    cta: "预约演示",
    accent: "blue" as const,
  },
];

const ACCENT_COLORS = {
  purple: { bg: "#7C3AED", bgSoft: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.3)" },
  pink: { bg: "#DB2777", bgSoft: "rgba(219,39,119,0.12)", border: "rgba(219,39,119,0.3)" },
  blue: { bg: "#3B82F6", bgSoft: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.3)" },
};

// ============================================================
// VARIANT A — Horizontal card row (original squishy style, adapted)
// ============================================================
function VariantA() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 transition-colors"
      style={{ background: "#0D1117", fontFamily: "'Inter','Segoe UI','PingFang SC',system-ui,sans-serif", color: "#E6EDF3" }}
    >
      {/* Nav placeholder — matches existing nav height */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 100, background: "rgba(13,17,23,0.88)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 28px", gap: 10 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#E6EDF3" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8Z" fill="#7C3AED"/><circle cx="12" cy="12" r="2.5" fill="#A78BFA"/></svg>
          <span style={{ fontFamily: "Georgia,'Times New Roman','STSong',serif", fontSize: 18, letterSpacing: "0.02em" }}>SynapseSpark</span>
        </a>
        <div style={{ flex: 1 }} />
        <a
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 22px", borderRadius: 9999,
            background: "#1C2333", color: "#E6EDF3",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            letterSpacing: "-0.01em",
            transition: "background 200ms ease",
          }}
        >
          返回首页
        </a>
      </div>

      <div style={{ marginTop: 56 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7C3AED", marginBottom: 14, textAlign: "center" }}>
          充值积分
        </p>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12, textAlign: "center" }}>
          选择合适的方案
        </h2>
        <p style={{ color: "#8B949E", fontSize: 15, textAlign: "center", marginBottom: 48, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
          选择最适合你的积分方案，解锁完整的灵感探索体验
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, maxWidth: 960 }}>
        {PLANS.map((plan) => (
          <PricingCardA key={plan.label} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function PricingCardA({ plan }: { plan: typeof PLANS[number] }) {
  const c = ACCENT_COLORS[plan.accent];
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 280, minHeight: 360,
        background: "#161B22",
        border: `1px solid ${c.border}`,
        borderRadius: 24,
        padding: 28,
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        transition: "border-color 300ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = c.bg; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = c.border; }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute", top: -60, right: -60,
          width: 160, height: 160, borderRadius: "50%",
          background: `radial-gradient(circle, ${c.bgSoft}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <span
        style={{
          display: "inline-block", padding: "5px 14px", borderRadius: 9999,
          background: c.bgSoft, color: c.bg,
          fontSize: 12, fontWeight: 700, letterSpacing: "0.01em",
          marginBottom: 18, width: "fit-content", position: "relative", zIndex: 1,
        }}
      >
        {plan.label}
      </span>

      <motion.div
        initial={{ scale: 0.85 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ fontFamily: "'Cascadia Code','JetBrains Mono',monospace", fontSize: 48, fontWeight: 900, lineHeight: 1.1, color: "#E6EDF3" }}>
          <span style={{ fontSize: 24 }}>¥</span>{plan.price}
        </div>
        <div style={{ fontSize: 13, color: "#8B949E", marginBottom: 4 }}>/ 月</div>
      </motion.div>

      <div style={{ color: "#8B949E", fontSize: 13, lineHeight: 1.6, marginTop: 12, marginBottom: 8, position: "relative", zIndex: 1 }}>
        {plan.description}
      </div>

      <div style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <span style={{ color: "#6A9955", fontWeight: 700 }}>✓</span>
          <span style={{ fontSize: 13, color: "#E6EDF3", fontWeight: 600 }}>{plan.credits} 积分</span>
        </div>
        <button
          style={{
            width: "100%", padding: "12px", borderRadius: 9999, border: "none",
            background: c.bg, color: "#FFF",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            letterSpacing: "-0.01em",
            transition: "transform 250ms cubic-bezier(0.16,1,0.3,1), box-shadow 250ms cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1.5px) scale(1.025)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.955)"; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1.5px) scale(1.025)"; }}
          onClick={() => alert(`已选择 ${plan.label} — 功能即将开放`)}
        >
          {plan.cta}
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================
// VARIANT B — Vertical stacked comparison table
// ============================================================
function VariantB() {
  return (
    <section
      className="min-h-screen px-4 py-16 transition-colors"
      style={{ background: "#0D1117", fontFamily: "'Inter','Segoe UI','PingFang SC',system-ui,sans-serif", color: "#E6EDF3" }}
    >
      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 100, background: "rgba(13,17,23,0.88)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 28px", gap: 10 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#E6EDF3" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8Z" fill="#7C3AED"/><circle cx="12" cy="12" r="2.5" fill="#A78BFA"/></svg>
          <span style={{ fontFamily: "Georgia,'Times New Roman','STSong',serif", fontSize: 18, letterSpacing: "0.02em" }}>SynapseSpark</span>
        </a>
        <div style={{ flex: 1 }} />
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 22px", borderRadius: 9999, background: "#1C2333", color: "#E6EDF3", fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em" }}>返回首页</a>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", marginTop: 56, paddingTop: 56 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7C3AED", marginBottom: 14 }}>
          充值积分
        </p>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
          方案对比
        </h2>
        <p style={{ color: "#8B949E", fontSize: 15, marginBottom: 48 }}>
          透明定价，随需而变
        </p>

        {/* Feature comparison rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#30363D", borderRadius: 24, overflow: "hidden", border: "1px solid #30363D" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#161B22", padding: "20px 24px", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#484F58", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>功能</div>
            {PLANS.map((p) => (
              <div key={p.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: ACCENT_COLORS[p.accent].bg, marginBottom: 2 }}>{p.label}</div>
                <div style={{ fontFamily: "'Cascadia Code',monospace", fontSize: 18, fontWeight: 800 }}>¥{p.price}/月</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            { feature: "积分额度", values: PLANS.map((p) => `${p.credits} 积分`) },
            { feature: "总结报告", values: ["10积分/次", "8积分/次", "5积分/次"] },
            { feature: "词库定制", values: ["—", "✓", "✓"] },
            { feature: "数据导出", values: ["—", "—", "✓"] },
            { feature: "团队共享", values: ["—", "✓", "✓"] },
            { feature: "专属词库", values: ["—", "—", "✓"] },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: i % 2 === 0 ? "#161B22" : "#1C2333", padding: "14px 24px", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 13, color: "#8B949E", fontWeight: 500 }}>{row.feature}</div>
              {row.values.map((v, j) => (
                <div key={j} style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: v === "✓" ? "#6A9955" : v === "—" ? "#484F58" : "#E6EDF3" }}>{v}</div>
              ))}
            </div>
          ))}

          {/* CTA row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#161B22", padding: "20px 24px", gap: 12 }}>
            <div />
            {PLANS.map((p) => (
              <button
                key={p.label}
                style={{
                  padding: "10px", borderRadius: 9999, border: "none",
                  background: ACCENT_COLORS[p.accent].bg, color: "#FFF",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  transition: "transform 250ms cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
                onClick={() => alert(`已选择 ${p.label} — 功能即将开放`)}
              >
                {p.cta}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// VARIANT C — Stepped single-column selection
// ============================================================
function VariantC() {
  return (
    <section
      className="min-h-screen px-4 py-16 transition-colors"
      style={{ background: "#0D1117", fontFamily: "'Inter','Segoe UI','PingFang SC',system-ui,sans-serif", color: "#E6EDF3" }}
    >
      {/* Nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 100, background: "rgba(13,17,23,0.88)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 28px", gap: 10 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#E6EDF3" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8Z" fill="#7C3AED"/><circle cx="12" cy="12" r="2.5" fill="#A78BFA"/></svg>
          <span style={{ fontFamily: "Georgia,'Times New Roman','STSong',serif", fontSize: 18, letterSpacing: "0.02em" }}>SynapseSpark</span>
        </a>
        <div style={{ flex: 1 }} />
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 22px", borderRadius: 9999, background: "#1C2333", color: "#E6EDF3", fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em" }}>返回首页</a>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", marginTop: 56, paddingTop: 56 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7C3AED", marginBottom: 14 }}>
          充值积分
        </p>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 }}>
          选择你的方案
        </h2>
        <p style={{ color: "#8B949E", fontSize: 15, marginBottom: 40 }}>
          每位新用户自动获得 100 免费积分，用完可随时升级
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PLANS.map((plan, i) => {
            const c = ACCENT_COLORS[plan.accent];
            return (
              <motion.div
                key={plan.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "#161B22",
                  border: "1px solid #30363D",
                  borderRadius: 20,
                  padding: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  cursor: "pointer",
                  transition: "border-color 300ms ease, background 300ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = c.bg; (e.currentTarget as HTMLDivElement).style.background = "#1C2333"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#30363D"; (e.currentTarget as HTMLDivElement).style.background = "#161B22"; }}
                onClick={() => alert(`已选择 ${plan.label} — 功能即将开放`)}
              >
                {/* Step number */}
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: c.bgSoft, color: c.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 900, flexShrink: 0,
                  fontFamily: "'Inter',sans-serif",
                }}>
                  {i + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 17, fontWeight: 700 }}>{plan.label}</span>
                    <span style={{ fontSize: 12, color: "#8B949E" }}>{plan.enLabel}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#8B949E", lineHeight: 1.5 }}>{plan.description}</p>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Cascadia Code',monospace", fontSize: 22, fontWeight: 800, color: c.bg }}>
                    ¥{plan.price}
                  </div>
                  <div style={{ fontSize: 11, color: "#484F58" }}>/月</div>
                </div>

                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  border: `2px solid ${c.bg}`,
                  color: c.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                  transition: "background 200ms ease",
                }}>
                  →
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Free tier reminder */}
        <div style={{
          marginTop: 24, padding: "16px 20px",
          background: "rgba(106,153,85,0.08)", border: "1px solid rgba(106,153,85,0.2)",
          borderRadius: 20, textAlign: "center",
        }}>
          <p style={{ fontSize: 13, color: "#6A9955", fontWeight: 600 }}>
            新用户注册即送 100 免费积分，无需绑定支付方式
          </p>
        </div>
      </div>
    </section>
  );
}

// Shell for Suspense fallback
function PricingShell() {
  return (
    <div style={{ background: "#0D1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#8B949E" }}>加载中...</p>
    </div>
  );
}
