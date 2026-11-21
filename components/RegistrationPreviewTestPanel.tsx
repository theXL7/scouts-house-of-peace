"use client";

import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";

import type { Locale } from "@/messages";

const WORKER_SUBMIT_URL =
  "https://scouts-registration-api.starofficiel2006.workers.dev/submit";
const TURNSTILE_SITE_KEY = "0x4AAAAAAGKxJFg2fGdgRdPT";

type TurnstileAPI = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": (errorCode: string) => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

const textByLocale = {
  en: {
    title: "Google Sheets integration — test only",
    description:
      "This is a preview-only test. The normal inquiry form below is disabled. Clicking the test button sends fixed fictional data, never information entered by visitors.",
    widgetError: "Turnstile verification failed. Error code:",
    widgetLoadError: "Turnstile script could not load. Check browser blockers or network access.",
    expired: "Verification expired. Please verify again.",
    verifyFirst: "Complete verification before sending the test.",
    button: "Send fictional test inquiry",
    pending: "Checking the spreadsheet connection…",
    success: "Test saved in Google Sheets. Reference:",
    invalidOrigin: "This preview URL is not yet allowed by the Worker. Update the Worker origin and hostname lists.",
    rejected: "The Worker rejected the test. Check Turnstile hostname and action settings.",
    rateLimit: "Too many attempts. Try again later.",
    unavailable: "The Worker could not confirm the Sheet write. Check its configuration and logs.",
    network: "Could not reach the Worker. Check its URL, CORS configuration, and network connection.",
    retry: "The verification token must be refreshed after each attempt.",
  },
  fr: {
    title: "Connexion à Google Sheets — essai uniquement",
    description:
      "Ceci est un essai réservé à la prévisualisation. Le formulaire normal ci-dessous est désactivé. Le bouton envoie uniquement des données fictives fixes, jamais des renseignements saisis par les visiteurs.",
    widgetError: "Échec de la vérification Turnstile. Code d\u0027erreur :",
    widgetLoadError: "Le script Turnstile n\u0027a pas pu être chargé. Vérifiez les extensions du navigateur ou la connexion.",
    expired: "La vérification a expiré. Veuillez réessayer.",
    verifyFirst: "Effectuez la vérification avant l'envoi du test.",
    button: "Envoyer une demande fictive",
    pending: "Vérification de la connexion au tableur…",
    success: "Essai enregistré dans Google Sheets. Référence :",
    invalidOrigin: "Cette URL de prévisualisation n'est pas autorisée par le Worker. Mettez à jour les listes d'origines et de domaines.",
    rejected: "Le Worker a refusé l'essai. Vérifiez le domaine et l'action Turnstile.",
    rateLimit: "Trop de tentatives. Réessayez plus tard.",
    unavailable: "Le Worker n'a pas confirmé l'écriture dans le tableur. Vérifiez sa configuration et ses journaux.",
    network: "Impossible de joindre le Worker. Vérifiez son URL, les paramètres CORS et la connexion.",
    retry: "Le jeton de vérification doit être renouvelé après chaque tentative.",
  },
  ar: {
    title: "اختبار الربط مع Google Sheets فقط",
    description:
      "هذه تجربة خاصة بنسخة المعاينة. النموذج العادي أدناه معطل، ولا يرسل زر الاختبار سوى بيانات وهمية ثابتة، دون أي معلومات شخصية للزوار.",
    widgetError: "فشل التحقق بواسطة Turnstile. رمز الخطأ:",
    widgetLoadError: "تعذر تحميل برنامج Turnstile. تحقق من إضافات المتصفح أو الاتصال بالشبكة.",
    expired: "انتهت صلاحية التحقق. يرجى المحاولة مجدداً.",
    verifyFirst: "يرجى إتمام التحقق قبل إرسال التجربة.",
    button: "إرسال طلب تجريبي وهمي",
    pending: "جارٍ اختبار الاتصال بجدول البيانات…",
    success: "تم تسجيل التجربة في Google Sheets. المرجع:",
    invalidOrigin: "رابط المعاينة غير مسموح به في Worker. يرجى تحديث النطاقات المسموح بها.",
    rejected: "رفض Worker التجربة. تحقق من إعدادات النطاق والإجراء في Turnstile.",
    rateLimit: "محاولات كثيرة. يرجى المحاولة لاحقاً.",
    unavailable: "لم يؤكد Worker حفظ البيانات في الجدول. تحقق من الإعدادات والسجلات.",
    network: "تعذر الوصول إلى Worker. تحقق من الرابط وإعدادات CORS والاتصال.",
    retry: "يلزم تجديد رمز التحقق بعد كل محاولة.",
  },
} satisfies Record<Locale, Record<string, string>>;

function fictionalSubmission(locale: Locale, turnstileToken: string) {
  const submissionId = crypto.randomUUID();
  return {
    submissionId,
    locale,
    fullName: "FICTIONAL TEST - NO REAL PERSON",
    guardianName: "FICTIONAL TEST GUARDIAN",
    phone: "+212600000000",
    email: "example@example.com",
    age: "15",
    status: "TEST ONLY - new scout",
    hasUniform: "TEST ONLY - no",
    size: "TEST ONLY - unknown",
    message: "SYNTHETIC TEST ONLY. This row contains no real family details. Test reference: " + submissionId,
    website: "",
    turnstileToken,
  };
}

export default function RegistrationPreviewTestPanel({
  locale,
  isRtl,
}: {
  locale: Locale;
  isRtl: boolean;
}) {
  const copy = textByLocale[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const busyRef = useRef(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; error: boolean } | null>(null);

  function renderWidget() {
    if (!containerRef.current || !window.turnstile || widgetId.current) return;
    try {
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: "registration_inquiry",
        callback: (value) => {
          setToken(value);
          setFeedback(null);
        },
        "expired-callback": () => {
          setToken("");
          setFeedback({ message: copy.expired, error: true });
        },
        "error-callback": (errorCode) => {
          setToken("");
          // Expose only Cloudflare's diagnostic code, never a token or credential.
          setFeedback({ message: `${copy.widgetError} ${errorCode}`, error: true });
        },
      });
    } catch {
      setFeedback({ message: copy.widgetLoadError, error: true });
    }
  }

  async function sendTest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyRef.current) return;
    if (!token) {
      setFeedback({ message: copy.verifyFirst, error: true });
      return;
    }

    const payload = fictionalSubmission(locale, token);
    busyRef.current = true;
    setBusy(true);
    setFeedback(null);

    try {
      const response = await fetch(WORKER_SUBMIT_URL, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; reference?: string; error?: string }
        | null;

      if (
        response.status === 201 &&
        result?.success === true &&
        result.reference === payload.submissionId
      ) {
        setFeedback({
          message: copy.success + " " + payload.submissionId,
          error: false,
        });
      } else {
        const errorMessage =
          result?.error === "origin_not_allowed"
            ? copy.invalidOrigin
            : result?.error === "verification_failed"
              ? copy.rejected
              : result?.error === "too_many_requests"
                ? copy.rateLimit
                : copy.unavailable;
        setFeedback({ message: errorMessage, error: true });
      }
    } catch {
      setFeedback({ message: copy.network, error: true });
    } finally {
      setToken("");
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetId.current);
        } catch {
          // The user can reload the preview if the verification iframe is gone.
        }
      }
      busyRef.current = false;
      setBusy(false);
    }
  }

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="mb-6 rounded-[1rem] border-2 border-[#C4B08E] bg-[#F8F2E9] p-5 text-[#36463C]"
      aria-label={copy.title}
    >
      <h3 className="font-semibold text-lg">{copy.title}</h3>
      <p className="mt-2 text-sm leading-7">{copy.description}</p>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
        onError={() => setFeedback({ message: copy.widgetLoadError, error: true })}
      />
      <form onSubmit={sendTest} className="mt-4 flex flex-col items-start gap-3">
        <div ref={containerRef} dir="ltr" />
        <button
          type="submit"
          disabled={busy || !token}
          className="min-h-12 rounded-full bg-[#2E4D3F] px-6 py-3 text-sm font-semibold text-[#FFFDFC] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? copy.pending : copy.button}
        </button>
      </form>
      {feedback && (
        <p role={feedback.error ? "alert" : "status"} aria-live="polite" className="mt-3 break-words text-sm leading-6">
          {feedback.message}
        </p>
      )}
      <p className="mt-2 text-xs opacity-75">{copy.retry}</p>
    </section>
  );
}
