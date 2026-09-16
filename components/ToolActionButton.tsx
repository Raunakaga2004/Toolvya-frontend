import Icon from '@/components/Icon';

export default function ToolActionButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-12 items-center gap-2.5 rounded-tv-md px-[22px] text-[15px] font-semibold ${
        disabled ? 'cursor-not-allowed bg-surface-3 text-muted' : 'cursor-pointer bg-primary text-on-primary hover:bg-primary-hover'
      }`}
    >
      <Icon name={icon} className="text-[20px]" />
      {label}
    </button>
  );
}
