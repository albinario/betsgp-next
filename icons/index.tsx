import { colors } from '@/theme'

export const Arrow = ({ diff }: { diff: number }) => (
	<svg
		className='ms-1'
		fill={diff > 0 ? colors.green : colors.red}
		opacity={diff === 0 ? 0 : 1}
		strokeWidth='0'
		transform={diff < 0 ? 'rotate(180)' : ''}
		viewBox='0 0 16 16'
		width='11'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M8 0.5l-7.5 7.5h4.5v8h6v-8h4.5z'></path>
	</svg>
)

export const Copyright = () => (
	<svg
		fill='currentColor'
		className='me-1'
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
		fill='currentColor'
		viewBox='0 0 16 16'
		width='16'
		height='16'
		xmlns='http://www.w3.org/2000/svg'
		// className='bi bi-envelope'
	>
		<path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z' />
	</svg>
)

export const FlagCheckered = () => (
	<svg
		// stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 512 512'
		width='12'
		height='12'
		xmlns='http://www.w3.org/2000/svg'
	>
		<title>Finished races</title>
		<path d='M243.2 189.9V258c26.1 5.9 49.3 15.6 73.6 22.3v-68.2c-26-5.8-49.4-15.5-73.6-22.2zm223.3-123c-34.3 15.9-76.5 31.9-117 31.9C296 98.8 251.7 64 184.3 64c-25 0-47.3 4.4-68 12 2.8-7.3 4.1-15.2 3.6-23.6C118.1 24 94.8 1.2 66.3 0 34.3-1.3 8 24.3 8 56c0 19 9.5 35.8 24 45.9V488c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24v-94.4c28.3-12.1 63.6-22.1 114.4-22.1 53.6 0 97.8 34.8 165.2 34.8 48.2 0 86.7-16.3 122.5-40.9 8.7-6 13.8-15.8 13.8-26.4V95.9c.1-23.3-24.2-38.8-45.4-29zM169.6 325.5c-25.8 2.7-50 8.2-73.6 16.6v-70.5c26.2-9.3 47.5-15 73.6-17.4zM464 191c-23.6 9.8-46.3 19.5-73.6 23.9V286c24.8-3.4 51.4-11.8 73.6-26v70.5c-25.1 16.1-48.5 24.7-73.6 27.1V286c-27 3.7-47.9 1.5-73.6-5.6v67.4c-23.9-7.4-47.3-16.7-73.6-21.3V258c-19.7-4.4-40.8-6.8-73.6-3.8v-70c-22.4 3.1-44.6 10.2-73.6 20.9v-70.5c33.2-12.2 50.1-19.8 73.6-22v71.6c27-3.7 48.4-1.3 73.6 5.7v-67.4c23.7 7.4 47.2 16.7 73.6 21.3v68.4c23.7 5.3 47.6 6.9 73.6 2.7V143c27-4.8 52.3-13.6 73.6-22.5z'></path>
	</svg>
)

export const Lock = () => (
	<svg
		fill='currentColor'
		viewBox='0 0 16 16'
		width='16'
		height='16'
		xmlns='http://www.w3.org/2000/svg'
		// className='bi bi-lock'
	>
		<path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1' />
	</svg>
)

export const Medal = ({ type }: { type: number }) => (
	<svg
		fill={type === 1 ? colors.gold : type === 2 ? colors.silver : colors.bronze}
		viewBox='0 0 512 512'
		width='12'
		height='12'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z'></path>
	</svg>
)

export const Pick = ({ creation }: { creation: boolean }) => (
	<svg
		fill={creation ? colors.green : colors.yellow}
		viewBox='0 0 16 16'
		width='16'
		height='16'
		xmlns='http://www.w3.org/2000/svg'
	>
		<title>{creation ? 'Picked riders' : 'Updated picks'}</title>
		<path d='M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z' />
		<path d='m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0' />
	</svg>
)

export const Picked = ({ clas }: { clas: string }) => (
	<svg
		className={clas}
		fill='currentColor'
		viewBox='0 0 16 16'
		width='16'
		height='16'
		xmlns='http://www.w3.org/2000/svg'
	>
		<title>Picked</title>
		<path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6' />
		<path
			fillRule='evenodd'
			d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5'
		/>
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
