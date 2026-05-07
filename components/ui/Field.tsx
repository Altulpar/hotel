type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
};

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  textarea,
  rows = 4,
  placeholder
}: FieldProps) {
  const className =
    "mt-1 w-full rounded-md border border-coast-sage/30 bg-white px-3 py-2 text-sm outline-none transition focus:border-coast-deep focus:ring-2 focus:ring-coast-sage/20";

  return (
    <label className="block text-sm font-medium text-coast-ink">
      {label}
      {textarea ? (
        <textarea
          name={name}
          rows={rows}
          defaultValue={defaultValue ?? ""}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
