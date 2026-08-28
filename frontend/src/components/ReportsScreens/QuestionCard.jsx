import { useState } from "react";

export default function QuestionCard({ question, yesLabel, noLabel, yesStyle = "danger", onAnswerChange }) {
  const [selected, setSelected] = useState(null);
  const choose = (answer) => {
    setSelected(answer);
    onAnswerChange?.(answer);
  };
  const yesSelectedClass = yesStyle === "success" ? "border-[#11998e] bg-[#11998e] text-white" : "border-[#0b213b] bg-[#0b213b] text-white";

  return (
    <section className="w-fit max-w-full rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_1px_rgba(15,23,42,0.02)]">
      <p className="max-w-[332px] text-[13px] font-bold leading-[17px] text-[#101f35]">{question}</p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button type="button" aria-pressed={selected === "yes"} onClick={() => choose("yes")} className={`h-8 rounded-md border px-5 text-[11px] font-bold transition-colors ${selected === "yes" ? yesSelectedClass : yesStyle === "success" ? "border-[#11998e] bg-[#11998e] text-white" : "border-red-500 bg-white text-red-600"}`}>{yesLabel}</button>
        <button type="button" aria-pressed={selected === "no"} onClick={() => choose("no")} className={`h-8 rounded-md border px-5 text-[11px] font-bold transition-colors ${selected === "no" ? "border-[#0b213b] bg-[#0b213b] text-white" : "border-slate-200 bg-white text-[#101f35]"}`}>{noLabel}</button>
      </div>
    </section>
  );
}
