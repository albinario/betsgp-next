'use client'
import { motion, AnimatePresence } from 'framer-motion'

const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
	<AnimatePresence>
		<motion.div
			initial={{
				opacity: 0,
				y: 0
			}}
			animate={{
				opacity: 1,
				y: 0
			}}
			exit={{ opacity: 0, y: 0 }}
			transition={{ delay: 0.3 }}
			className='min-h-screen flex justify-center items-center'
		>
			<div>{children}</div>
		</motion.div>
	</AnimatePresence>
)

export default AnimationWrapper
