interface Props {
  size?: number
}

export default function BlackHole({ size = 360 }: Props) {
  return (
    <div className="black-hole visible" style={{ width: size, height: size }} aria-hidden="true">
      <div className="disk" />
      <div className="disk-edge" />
      <div className="lens" />
      <div className="core" />
    </div>
  )
}
