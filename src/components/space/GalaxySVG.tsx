interface Props {
  size?: number;
}

export default function GalaxySVG({ size = 600 }: Props) {
  return (
    <svg
      className='galaxy visible'
      viewBox='-100 -100 200 200'
      style={{ width: size, height: size, display: 'block' }}
      aria-hidden='true'
    >
      <defs>
        <radialGradient id='g-core'>
          <stop offset='0%' stopColor='#fff5d4' stopOpacity='1' />
          <stop offset='40%' stopColor='#ffd070' stopOpacity='0.8' />
          <stop offset='100%' stopColor='rgba(255,150,40,0)' />
        </radialGradient>
        <radialGradient id='g-arm-v'>
          <stop offset='0%' stopColor='rgba(192,132,252,0.7)' />
          <stop offset='60%' stopColor='rgba(120,80,200,0.25)' />
          <stop offset='100%' stopColor='rgba(80,40,150,0)' />
        </radialGradient>
        <radialGradient id='g-arm-b'>
          <stop offset='0%' stopColor='rgba(120,180,255,0.6)' />
          <stop offset='60%' stopColor='rgba(60,100,200,0.2)' />
          <stop offset='100%' stopColor='rgba(40,60,150,0)' />
        </radialGradient>
      </defs>
      <g className='spin'>
        <ellipse cx='0' cy='0' rx='95' ry='32' fill='url(#g-arm-v)' opacity='0.4' />
        {[0, 45, 90, 135].map((deg) => (
          <ellipse
            key={deg}
            cx='0'
            cy='0'
            rx='86'
            ry='8'
            fill='url(#g-arm-v)'
            transform={`rotate(${deg})`}
            opacity='0.7'
          />
        ))}
        {[22, 67, 112, 157].map((deg) => (
          <ellipse
            key={deg}
            cx='0'
            cy='0'
            rx='74'
            ry='5'
            fill='url(#g-arm-b)'
            transform={`rotate(${deg})`}
            opacity='0.5'
          />
        ))}
        <ellipse cx='0' cy='0' rx='78' ry='18' fill='url(#g-core)' opacity='0.4' />
        <circle cx='0' cy='0' r='20' fill='url(#g-core)' />
        <circle cx='0' cy='0' r='6' fill='#fff8dc' />
      </g>
    </svg>
  );
}
