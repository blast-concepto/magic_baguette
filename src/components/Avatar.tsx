const GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #a855f7)',
  'linear-gradient(135deg, #ec4899, #f97316)',
  'linear-gradient(135deg, #10b981, #3b82f6)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  'linear-gradient(135deg, #14b8a6, #a855f7)',
];

export function avatarGradient(name: string) {
  return GRADIENTS[name.charCodeAt(0) % GRADIENTS.length];
}

interface Props {
  name: string;
  size?: number;
  fontSize?: number;
  radius?: number | string;
}

export default function Avatar({ name, size = 44, fontSize = 18, radius = 12 }: Props) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: avatarGradient(name),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, color: '#fff', fontWeight: 800, fontSize,
      letterSpacing: '-0.02em', userSelect: 'none',
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
