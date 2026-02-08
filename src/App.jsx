import { useMemo, useState } from "react";

const SCENARIOS = [
  { key: "family_friends", title: "家人&朋友", emoji: "🏠", desc: "家庭沟通 · 朋友相处 · 圈子关系" },
  { key: "campus", title: "校园", emoji: "🎓", desc: "同学舍友 · 导师老师 · 校园关系" },
  { key: "workplace", title: "职场", emoji: "💼", desc: "同事沟通 · 领导汇报 · 边界与协作" },
  { key: "romance", title: "恋爱", emoji: "💗", desc: "暧昧推进 · 情侣相处 · 感情问题" },
];

const OPTIONS = {
  family_friends: {
    roles: [
      "直系家人（父母/子女/兄弟姐妹）",
      "其他家人（亲戚/长辈/堂表兄弟姐妹）",
      "普通朋友",
      "老朋友/好朋友",
      "熟人/圈子关系（邻居/群友/朋友的朋友）",
      "特殊关系",
      "其他",
    ],
    stages: [
      "日常相处",
      "升温/靠近",
      "冷淡/疏远",
      "闹别扭/有摩擦",
      "边界问题（不想继续但不好翻脸...）",
      "需决定/表态（继续/调整/疏远）",
      "其他",
    ],
  },
  campus: {
    roles: [
      "普通同学",
      "朋友型同学",
      "舍友",
      "学长/学姐/前辈",
      "学弟/学妹/后辈",
      "老师/导师/辅导员",
      "其他",
    ],
    stages: [
      "日常相处",
      "合作",
      "拉近关系",
      "冷淡/疏远",
      "有摩擦/矛盾",
      "边界问题（不想继续这样但不好说...）",
      "需表态/决定",
      "其他",
    ],
  },
  romance: {
    roles: [
      "潜在对象",
      "喜欢的人/喜欢我的人（未确定关系）",
      "暧昧对象",
      "恋人/对象",
      "前任",
      "其他",
    ],
    stages: [
      "升温中",
      "拉扯中（忽冷忽热）",
      "想推进关系（见面/确认态度...）",
      "矛盾/冷暴力",
      "抉择时刻（告白/分手...）",
      "其他",
    ],
  },
  workplace: {
    roles: [
      "直属领导",
      "上级的上级（老板）",
      "同组同事",
      "跨部门同事/合作方",
      "下属/实习生",
      "非日常关键角色（HR/客户/甲方/乙方...）",
      "其他",
    ],
    stages: [
      "日常工作往来",
      "正在合作",
      "有事要争取/表达",
      "气氛不对/有摩擦/PUA",
      "边界问题（被越界/消耗）",
      "需表态/决定（不能再拖）",
      "其他",
    ],
  },
};

function Stepper({ step }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-3 mb-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex items-center gap-3">
          <div
            className={[
              "w-9 h-9 rounded-full flex items-center justify-center font-semibold",
              step === n
                ? "bg-slate-900 text-white"
                : step > n
                ? "bg-slate-200 text-slate-700"
                : "bg-slate-100 text-slate-400",
            ].join(" ")}
          >
            {n}
          </div>
          {n !== 4 ? (
            <div
              className={`h-1 w-10 rounded-full ${
                step > n ? "bg-slate-900" : "bg-slate-200"
              }`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function CardOption({ selected, title, desc, emoji, onClick, tone = "default" }) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-50 border-blue-200"
      : tone === "pink"
      ? "bg-pink-50 border-pink-200"
      : tone === "yellow"
      ? "bg-amber-50 border-amber-200"
      : "bg-slate-50 border-slate-200";

  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left border rounded-2xl p-5 transition",
        toneClass,
        selected
          ? "ring-2 ring-slate-900 border-slate-900"
          : "hover:border-slate-400",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center text-2xl">
            {emoji}
          </div>
          <div>
            <div className="text-xl font-bold">{title}</div>
            <div className="mt-1 text-sm opacity-70">{desc}</div>
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            selected ? "bg-slate-900 text-white" : "bg-white/70 text-slate-400"
          }`}
        >
          ✓
        </div>
      </div>
    </button>
  );
}

function SelectField({ label, value, onChange, options, hint }) {
  return (
    <div className="mt-5">
      <div className="text-sm font-semibold">{label}</div>
      {hint ? <div className="text-xs opacity-60 mt-1">{hint}</div> : null}
      <select
        className="mt-2 w-full border rounded-xl p-3 bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    </div>
  );
}

function InlineInput({ label, value, onChange, placeholder }) {
  return (
    <div className="mt-3">
      <div className="text-xs opacity-70">{label}</div>
      <input
        className="mt-2 w-full border rounded-xl p-3 bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, required = false }) {
  return (
    <div className="mt-5">
      <div className="text-sm font-semibold">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </div>
      <textarea
        className="mt-2 w-full border rounded-xl p-3 bg-transparent"
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className="text-sm px-3 py-1 rounded-lg border hover:bg-slate-50"
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}

export default function App() {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787";

  const DEFAULT_SCENARIO = "family_friends";
  const defaultRole = OPTIONS[DEFAULT_SCENARIO]?.roles?.[0] || "";
  const defaultStage = OPTIONS[DEFAULT_SCENARIO]?.stages?.[0] || "";

  const [step, setStep] = useState(1);

  // Step1
  const [scenario, setScenario] = useState(DEFAULT_SCENARIO);
  const scenarioMeta = useMemo(
    () => SCENARIOS.find((x) => x.key === scenario),
    [scenario]
  );

  // Step2
  const roleOptions = OPTIONS[scenario]?.roles || [];
  const stageOptions = OPTIONS[scenario]?.stages || [];
  const [role, setRole] = useState(defaultRole);
  const [roleExtra, setRoleExtra] = useState("");
  const [relationStage, setRelationStage] = useState(defaultStage);
  const [stageExtra, setStageExtra] = useState("");

  // Step3
  const [screenshots, setScreenshots] = useState([]); // File[]
  const [messageText, setMessageText] = useState("");
  const [userFeeling, setUserFeeling] = useState("");
  const [goal, setGoal] = useState("");

  // Step4 result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Step4 follow-up chat (保持你原来的续聊UI)
  const [chatMessages, setChatMessages] = useState([]); // {role:'user'|'assistant', content:string}
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  // Step4：不推荐回复折叠（新增）
  const [showAvoid, setShowAvoid] = useState(false);

  function toneToCardTone(key) {
    if (key === "workplace") return "blue";
    if (key === "romance") return "pink";
    if (key === "campus") return "yellow";
    return "default";
  }

  function applyScenario(next) {
    setScenario(next);
    setRole(OPTIONS[next]?.roles?.[0] || "");
    setRelationStage(OPTIONS[next]?.stages?.[0] || "");
    setRoleExtra("");
    setStageExtra("");
  }

  function resetAll() {
    setStep(1);

    setScenario(DEFAULT_SCENARIO);
    setRole(defaultRole);
    setRelationStage(defaultStage);
    setRoleExtra("");
    setStageExtra("");

    setScreenshots([]);
    setMessageText("");
    setUserFeeling("");
    setGoal("");

    setResult(null);
    setError("");
    setLoading(false);

    setChatMessages([]);
    setChatInput("");
    setChatLoading(false);
    setChatError("");

    setShowAvoid(false);
  }

  function onPickFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setScreenshots((prev) => [...prev, ...files].slice(0, 6));
    e.target.value = "";
  }

  function removeFile(idx) {
    setScreenshots((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleAnalyze() {
    setError("");
    setResult(null);
    setShowAvoid(false);

    if (!messageText.trim()) {
      setError("请至少用文字描述一句：对方说了什么 / 发生了什么。");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        scenario_type: scenarioMeta?.title || scenario,
        counterparty_role: role,
        counterparty_role_extra: roleExtra.trim(),
        relationship_stage: relationStage,
        relationship_stage_extra: stageExtra.trim(),
        message_text: messageText.trim(),
        user_feeling: userFeeling.trim(),
        goal: goal.trim(),
        screenshots_count: screenshots.length,
      };

      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "请求失败");

      setResult(data);
      // 续聊UI保持原来逻辑：你原来这里会清空，我不动它
      setChatMessages([]);
      setChatInput("");
      setChatError("");

      setStep(4);
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function sendFollowup() {
    setChatError("");
    const text = chatInput.trim();
    if (!text) return;

    const nextMessages = [...chatMessages, { role: "user", content: text }];
    setChatMessages(nextMessages);
    setChatInput("");

    if (!result) {
      setChatError("请先生成一次建议。");
      return;
    }

    setChatLoading(true);
    try {
      const payload = {
        scenario_type: scenarioMeta?.title || scenario,
        counterparty_role: role,
        counterparty_role_extra: roleExtra.trim(),
        relationship_stage: relationStage,
        relationship_stage_extra: stageExtra.trim(),
        message_text: messageText.trim(),
        user_feeling: userFeeling.trim(),
        goal: goal.trim(),
        initial_result: result,
        chat_history: nextMessages,
        user_input: text,
      };

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "追问请求失败");

      const reply = (data?.reply || "").toString().trim();
      if (!reply) throw new Error("后端没有返回 reply");

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (e) {
      setChatError(String(e?.message || e));
    } finally {
      setChatLoading(false);
    }
  }

  // ---- Result data (兼容新旧后端输出) ----
  const intentPrimary =
    (result?.intent?.primary || "").toString().trim() ||
    (result?.conclusion || result?.core_intent || result?.analysis || "")
      .toString()
      .trim() ||
    (Array.isArray(result?.intent_radar) && result.intent_radar[0]?.name
      ? `更像：${result.intent_radar[0].name}`
      : "");

  const intentAlt =
    (result?.intent?.alt || "").toString().trim() ||
    (Array.isArray(result?.intent_radar) && result.intent_radar[1]?.name
      ? `也可能：${result.intent_radar[1].name}`
      : "");

  const verifyNext =
    (result?.intent?.verify_next || "").toString().trim() ||
    (Array.isArray(result?.intent_radar) && result.intent_radar[0]?.verify_next
      ? result.intent_radar[0].verify_next
      : "");

  const followupQ =
    (result?.followup || "").toString().trim() ||
    (result?.followup_question || "").toString().trim();

  const newReplies = result?.replies || {};

  const A = newReplies?.A || newReplies?.A_safe || null;
  const B = newReplies?.B || newReplies?.B_push || null;
  const C = newReplies?.C || newReplies?.C_avoid || null;

  const A_watch =
    (A?.watch_out || "").toString().trim() || (A?.risk || "").toString().trim();
  const B_watch =
    (B?.watch_out || "").toString().trim() || (B?.risk || "").toString().trim();
  const C_watch =
    (C?.watch_out || "").toString().trim() || (C?.risk || "").toString().trim();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto p-6">

        <Stepper step={step} />

        {/* Step 1 */}
        {step === 1 ? (
          <div>
            <div className="text-3xl font-extrabold text-center mt-2">
              选择场景类型
            </div>
            <div className="text-center mt-2 text-base opacity-70">
              告诉我你正在面对的是哪种情境
            </div>

            <div className="mt-8 space-y-4">
              {SCENARIOS.map((s) => (
                <CardOption
                  key={s.key}
                  title={s.title}
                  desc={s.desc}
                  emoji={s.emoji}
                  selected={scenario === s.key}
                  onClick={() => applyScenario(s.key)}
                  tone={toneToCardTone(s.key)}
                />
              ))}
            </div>

            <div className="mt-8">
              <button
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-semibold text-lg"
                onClick={() => setStep(2)}
              >
                下一步 →
              </button>
            </div>
          </div>
        ) : null}

        {/* Step 2 */}
        {step === 2 ? (
          <div>
            <div className="text-3xl font-extrabold text-center mt-2">
              选择身份与关系
            </div>
            <div className="text-center mt-2 text-base opacity-70">
              先选对方身份，再选关系阶段（不全面可自行补充）
            </div>

            <div className="mt-8 border rounded-2xl p-5">
              <div className="text-sm font-semibold">场景</div>
              <div className="mt-2 font-bold text-lg">
                {scenarioMeta?.emoji} {scenarioMeta?.title}
              </div>
              <div className="mt-2 text-xs opacity-60">
                备注：身份/关系可能不全面，你可以在下方“自定义补充”里编辑更细化内容（可选）。
              </div>

              <SelectField
                label="对方身份（先选这个）"
                value={role}
                onChange={setRole}
                options={roleOptions}
              />
              <InlineInput
                label="自定义补充（可选）"
                value={roleExtra}
                onChange={setRoleExtra}
                placeholder="例如：表姐；同组里最爱抢功的人；他是我闺蜜的男朋友..."
              />

              <SelectField
                label="关系阶段（再选这个）"
                value={relationStage}
                onChange={setRelationStage}
                options={stageOptions}
              />
              <InlineInput
                label="自定义补充（可选）"
                value={stageExtra}
                onChange={setStageExtra}
                placeholder="例如：最近明显冷了；刚吵完架；我想推进见面..."
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="w-1/3 py-4 rounded-2xl border font-semibold"
                onClick={() => setStep(1)}
              >
                返回
              </button>
              <button
                className="w-2/3 py-4 rounded-2xl bg-slate-900 text-white font-semibold text-lg"
                onClick={() => setStep(3)}
              >
                下一步 →
              </button>
            </div>
          </div>
        ) : null}

        {/* Step 3 */}
        {step === 3 ? (
          <div>
            <div className="text-3xl font-extrabold text-center mt-2">
              描述你的情境
            </div>
            <div className="text-center mt-2 text-base opacity-70">
              截图是加分项，文字是必填项
            </div>

            <div className="mt-8 border rounded-2xl p-5">
              <div className="text-sm font-semibold">聊天截图（可选，推荐）</div>
              <div className="mt-2 text-xs opacity-60">
                可上传多张（最多 6 张）。
              </div>

              <label className="mt-3 block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:bg-slate-50">
                <div className="mt-2 font-semibold">点击上传聊天截图</div>
                <div className="mt-1 text-sm opacity-60">
                  更精准的分析需要对话上下文
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onPickFiles}
                />
              </label>

              {screenshots.length ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {screenshots.map((f, idx) => (
                    <div key={idx} className="border rounded-xl p-2">
                      <div className="text-xs truncate">{f.name}</div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-xs opacity-60">
                          {Math.round(f.size / 1024)} KB
                        </div>
                        <button
                          className="text-xs px-2 py-1 rounded-lg border"
                          onClick={() => removeFile(idx)}
                        >
                          移除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-6 border rounded-2xl p-5">
              <TextField
                label="文字描述"
                required
                value={messageText}
                onChange={setMessageText}
                placeholder='例如：她发消息说「你最近怎么老这么忙」…（把关键句粘贴进来就行）'
              />
              <TextField
                label="你现在的感受/补充（可选）"
                value={userFeeling}
                onChange={setUserFeeling}
                placeholder="例如：我不知道怎么办了；我怕回错扣分；我不想显得太热..."
              />
              <TextField
                label="你的目标（可选）"
                value={goal}
                onChange={setGoal}
                placeholder="例如：我希望能自然拉近；我希望委婉拒绝但不伤关系；我想把边界立住..."
              />
            </div>

            {error ? (
              <div className="mt-4 text-sm text-red-500">{error}</div>
            ) : null}

            <div className="mt-6 flex gap-3">
              <button
                className="w-1/3 py-4 rounded-2xl border font-semibold"
                onClick={() => setStep(2)}
                disabled={loading}
              >
                返回
              </button>
              <button
                className="w-2/3 py-4 rounded-2xl bg-slate-900 text-white font-semibold text-lg"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "分析中..." : "获取建议"}
              </button>
            </div>
          </div>
        ) : null}

        {/* Step 4 */}
        {step === 4 ? (
          <div>
            <div className="text-3xl font-extrabold text-center mt-2">结果</div>
            <div className="text-center mt-2 text-base opacity-70">
              对方意图 → 回复建议 → 继续追问
            </div>

            {/* A) 对方意图（简洁版） */}
            <div className="mt-8 border rounded-2xl p-5">
              <div className="text-lg font-bold">对方意图</div>

              <div className="mt-3 text-base opacity-90 whitespace-pre-wrap">
                {intentPrimary || "（信息有点少：你可以再补一句上下文）"}
              </div>

              {intentAlt ? (
                <div className="mt-2 text-sm opacity-70 whitespace-pre-wrap">
                  {intentAlt}
                </div>
              ) : null}

              {verifyNext ? (
                 <div className="mt-3 border rounded-xl p-3 bg-slate-50">
                 <div className="mb-2 text-xs font-semibold opacity-70">
                 验证句
                 </div>

                 <div className="flex items-center gap-3">
                 <div className="flex-1 text-sm opacity-90 whitespace-pre-wrap">
                 {verifyNext}
                 </div>
                 <CopyButton text={verifyNext} />
                 </div>
                 </div>
              ) : null}
              
            </div>

            {/* B) 回复建议（只露A/B，C默认折叠） */}
            <div className="mt-6 border rounded-2xl p-5">
              <div className="text-lg font-bold">回复建议</div>

              <div className="mt-4 space-y-4">
                {/* A */}
                {A?.text ? (
                  <div className="border rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">{A?.label || "稳妥保分"}</div>
                      <CopyButton text={A.text} />
                    </div>

                    <div className="mt-3 whitespace-pre-wrap text-base">
                      {A.text}
                    </div>

                    {A_watch ? (
                      <div className="mt-2 text-sm opacity-70">
                        提醒：{A_watch}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* B */}
                {B?.text ? (
                  <div className="border rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">{B?.label || "轻推进"}</div>
                      <CopyButton text={B.text} />
                    </div>

                    <div className="mt-3 whitespace-pre-wrap text-base">
                      {B.text}
                    </div>

                    {B_watch ? (
                      <div className="mt-2 text-sm opacity-70">
                        提醒：{B_watch}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* C：默认折叠 */}
                {C?.text ? (
                  <div className="border rounded-2xl p-4 bg-slate-50">
                    <button
                      className="w-full flex items-center justify-between"
                      onClick={() => setShowAvoid((v) => !v)}
                    >
                      <div className="font-bold text-red-600">
                        {C?.label || "不推荐"}（点我{showAvoid ? "收起" : "展开"}）
                      </div>
                      <div className="text-sm opacity-60">
                        {showAvoid ? "−" : "+"}
                      </div>
                    </button>

                    {showAvoid ? (
                      <div className="mt-3">
                        <div className="flex items-center justify-end">
                          <CopyButton text={C.text} />
                        </div>
                        <div className="mt-2 whitespace-pre-wrap text-base">
                          {C.text}
                        </div>
                        {C_watch ? (
                          <div className="mt-2 text-sm opacity-70">
                            翻车点：{C_watch}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            {/* 4) 续聊入口（保持你原来的续聊UI不变） */}
            <div className="mt-6 border rounded-2xl p-5">
              <div className="text-lg font-bold">继续问</div>

              <div className="mt-4 border rounded-2xl p-3 max-h-72 overflow-auto bg-slate-50">
                {chatMessages.length ? (
                  <div className="space-y-3">
                    {chatMessages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={[
                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                            m.role === "user"
                              ? "bg-slate-900 text-white"
                              : "bg-white border",
                          ].join(" ")}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  className="flex-1 border rounded-2xl p-3 bg-transparent"
                  placeholder="例如：我按照回复1的方式说了，他回了“xxx”，我怎么接？"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (!chatLoading) sendFollowup();
                    }
                  }}
                />
                <button
                  className="px-5 rounded-2xl bg-slate-900 text-white font-semibold disabled:opacity-50"
                  onClick={sendFollowup}
                  disabled={chatLoading}
                >
                  {chatLoading ? "发送中..." : "发送"}
                </button>
              </div>

              {chatError ? (
                <div className="mt-3 text-sm text-red-500">{chatError}</div>
              ) : null}
            </div>

            {/* Bottom actions */}
            <div className="mt-6 flex gap-3">
              <button
                className="w-1/3 py-4 rounded-2xl border font-semibold"
                onClick={() => setStep(3)}
              >
                返回修改
              </button>
              <button
                className="w-2/3 py-4 rounded-2xl bg-slate-900 text-white font-semibold text-lg"
                onClick={resetAll}
              >
                新开一个情境（全部重置）
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-10 text-xs opacity-60">
          注意：结果仅供参考，不构成任何法律/情感建议。请根据实际情况谨慎判断使用。
        </div>
      </div>
    </div>
  );
}

