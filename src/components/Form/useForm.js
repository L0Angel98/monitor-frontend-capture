export default function useForm({ defaultData }) {
  const [form, setForm] = useState(defaultData ? defaultData : {});

  const onChange = event => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  return [form, onChange];
}
