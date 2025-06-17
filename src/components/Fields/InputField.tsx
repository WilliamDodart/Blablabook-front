interface IInputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  defaultValue?: string;
}

function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = true,
  defaultValue,
}: IInputFieldProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
      />
      {error && <p className="form-error">{error}</p>}
    </>
  );
}

export default InputField;
