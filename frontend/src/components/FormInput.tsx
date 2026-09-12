type FormInputProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
};

function FormInput({
  id,
  label,
  type,
  placeholder,
  value,
  error,
  onChange,
}: FormInputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={error ? "input-error" : ""}
      />

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default FormInput;