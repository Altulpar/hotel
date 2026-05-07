type SelectFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
};

export function SelectField({ label, name, defaultValue, options }: SelectFieldProps) {
  return (
    <label className="block text-sm font-medium text-coast-ink">
      {label}
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-coast-sage/30 bg-white px-3 py-2 text-sm outline-none transition focus:border-coast-deep focus:ring-2 focus:ring-coast-sage/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
