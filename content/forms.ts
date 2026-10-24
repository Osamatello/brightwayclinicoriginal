// Shared form fields (kept outside the "use client" form component so server pages can import them)
export type FormField = { name: string; label: string; type?: string; autoComplete?: string; required?: boolean; textarea?: boolean };

export const nameFields: FormField[] = [
  { name: "name", label: "Full name", autoComplete: "name", required: true },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", autoComplete: "tel", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
];
