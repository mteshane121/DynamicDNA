import { useState } from "react";
import { AlertTriangle, ArrowLeft, Check, LoaderCircle, LogOut, Shield, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../../components/ReportsScreens/QuestionCard";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

export default function PublicReportScreening() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [answers, setAnswers] = useState({});
  const [submitState, setSubmitState] = useState("idle");

  const selectAnswer = (question, answer) => {
    setAnswers((current) => ({ ...current, [question]: answer }));
    setSubmitState("idle");
  };
  const submitScreening = async () => {
    if (Object.keys(answers).length !== 3) return setSubmitState("incomplete");
    setSubmitState("submitting");
    try {
      await axiosInstance.get("/messages/send", { params: { screening: JSON.stringify(answers) } });
      setSubmitState("approved");
      window.setTimeout(() => navigate("/"), 1400);
    } catch { setSubmitState("error"); }
  };
  const handleLogout = async () => { await logout(); navigate("/login"); };

  return (
    <div className="relative z-10 flex min-h-screen flex-col bg-[#f7f9fc] font-sans text-[#101f35]">
      <div className="flex h-1 w-full bg-black"><div className="w-[21%] bg-[#ed302b]" /><div className="w-[20%] bg-[#008b6b]" /><div className="w-[20%] bg-[#1c20a1]" /><div className="w-[20%] bg-[#f5b516]" /></div>
      <header className="flex h-[59px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-10">
        <div className="flex items-center gap-2.5"><div className="grid h-[30px] w-[30px] place-items-center rounded-sm bg-[#edf2f8] text-[#102743]"><Shield className="h-5 w-5 stroke-[2]" /></div><div className="leading-none"><h1 className="text-[13px] font-bold tracking-[-0.02em]">Community Incident Reporting System</h1><p className="mt-1 text-[9px] font-bold text-[#009b86]">REPUBLIC OF SOUTH AFRICA</p></div></div>
        <nav className="flex items-center gap-6 text-[11px] font-medium"><button type="button" onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-[#101f35] transition-colors hover:text-[#008d7c]"><ArrowLeft className="h-3.5 w-3.5" />Back</button><a href="#emergency-guide">Emergency Guide</a><a href="#new-report" className="font-bold text-[#008d7c]">New Report</a><a href="#track-status">Track Status</a><span className="h-5 border-l border-slate-200" aria-hidden="true" /><button type="button" onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-sm bg-[#f0f4f8] px-2.5 py-1.5 font-mono text-[9px] font-bold tracking-wide text-slate-600 transition-colors hover:bg-slate-200"><LogOut className="h-3 w-3" />LOGOUT</button></nav>
      </header>
      <main className="mx-auto w-full max-w-[1110px] flex-1 px-7 pb-10 pt-10">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase"><span className="text-[#009786]">Step 1 of 3</span><span className="text-slate-500">Eligibility Screening</span></div>
        <div className="mt-2 h-1 w-full rounded-full bg-[#e0e6ef]"><div className="h-1 w-[37.5%] rounded-full bg-[#109b8c]" /></div>
        <div className="mt-7 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_377px] lg:gap-20">
          <div><h2 className="text-[20px] font-bold tracking-[-0.03em]">Initial Screening Questions</h2><div className="mt-5 space-y-5"><QuestionCard question="1. Is anyone currently in immediate danger or is there a threat of violence?" yesLabel="Yes, There is Danger" noLabel="No, Scene is Safe" onAnswerChange={(answer) => selectAnswer("immediateDanger", answer)} /><QuestionCard question="2. Do you require immediate ambulance or fire services at this location?" yesLabel="Yes, Send Services" noLabel="No, Not Required" onAnswerChange={(answer) => selectAnswer("emergencyServices", answer)} /><QuestionCard question="3. Did the incident occur in the past (not currently in progress) with the scene now stable?" yesLabel="Yes, Scene is Now Stable" noLabel="No, Scene In progress" onAnswerChange={(answer) => selectAnswer("sceneStable", answer)} /></div><div className="mt-7 flex max-w-[719px] justify-center"><div className="flex flex-col items-center gap-2"><button type="button" disabled={submitState === "submitting" || submitState === "approved"} onClick={submitScreening} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#11998e] px-7 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-[#0d857b] disabled:cursor-not-allowed disabled:opacity-75">{submitState === "submitting" && <LoaderCircle className="h-4 w-4 animate-spin" />}{submitState === "submitting" ? "Submitting..." : "Proceed"}</button>{submitState === "incomplete" && <p className="text-[11px] font-medium text-red-600">Please answer all three questions.</p>}{submitState === "error" && <p className="text-[11px] font-medium text-red-600">Could not send your answers. Please try again.</p>}</div></div></div>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white px-5 py-[19px]"><h3 className="text-[13px] font-bold">Eligible Incidents for Online Reporting</h3><p className="mt-4 text-[11px] leading-[17px] text-slate-600">Only the following low-risk event types may be processed through this simulation environment.</p><ul className="mt-4 space-y-2 text-[12px] text-[#17243a]">{["Property Damage / Vandalism", "Minor Theft (no physical threat/weapons)", "Persistent Noise Nuisances", "Lost Personal Belongings"].map((item) => <li key={item} className="flex items-center gap-2"><ShieldCheck className="h-[14px] w-[14px] shrink-0 text-[#009b8d]" />{item}</li>)}</ul><div className="mt-4 flex items-center gap-2 rounded-md border border-[#f5d66b] bg-[#fffaf0] px-2 py-2 text-[10px] text-[#a64a09]"><AlertTriangle className="h-[14px] w-[14px] shrink-0" />Filing a false report is a criminal offense under South African Law.</div></aside>
        </div>
      </main>
      <footer className="h-[69px] shrink-0 bg-[#09223f] px-10"><div className="mx-auto h-full max-w-[1140px] border-t border-[#163653]" /></footer>
      {submitState === "approved" && <div className="fixed inset-0 z-20 grid place-items-center bg-[#0b213b]/20 p-4 backdrop-blur-[1px]" role="dialog" aria-modal="true" aria-label="Screening approved"><div className="w-full max-w-[280px] rounded-lg border border-slate-200 bg-white p-5 text-center shadow-xl"><div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#e6f7f4] text-[#11998e]"><Check className="h-5 w-5 stroke-[3]" /></div><h2 className="mt-3 text-[14px] font-bold">Screening approved</h2><p className="mt-1 text-[11px] leading-4 text-slate-500">Your answers have been received. Taking you to the next page...</p></div></div>}
    </div>
  );
}
