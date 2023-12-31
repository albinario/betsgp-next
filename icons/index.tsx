import { colors } from '@/theme'

export const Copyright = () => (
	<svg
		className='bi bi-c-circle me-1'
		fill='currentColor'
		viewBox='0 0 16 16'
		width='10'
		height='10'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z' />
	</svg>
)

export const Envelope = () => (
	<svg
		className='bi bi-envelope'
		fill='currentColor'
		viewBox='0 0 16 16'
		width='16'
		height='16'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z' />
	</svg>
)

export const Lock = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		fill='currentColor'
		className='bi bi-lock'
		viewBox='0 0 16 16'
	>
		<path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1' />
	</svg>
)

export const Medal = ({ type }: { type: number }) => (
	<svg
		fill={type === 1 ? colors.gold : type === 2 ? colors.silver : colors.bronze}
		viewBox='0 0 512 512'
		height='12'
		width='12'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z'></path>
	</svg>
)

export const Star = ({ type, width }: { type: number; width: number }) => (
	<svg
		fill={type === 1 ? colors.gold : type === 2 ? colors.silver : colors.bronze}
		viewBox='0 0 260 245'
		width={width}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='m56,237 74-228 74,228L10,96h240' />
	</svg>
)
