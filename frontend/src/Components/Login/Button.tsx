interface Props {
  text: string;
  disabled?: boolean;
  loading?: boolean;
}
const myStyle = {
  background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
};

const Button = ({ text, disabled, loading }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="cursor-pointer mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
      style={myStyle}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
