import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.25
    }
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.5
    }
  }
}

export const Transition = ({ children }) => {
  const { asPath } = useRouter()

  return (
    <div className='effect-1'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={asPath}
          variants={variants}
          animate='in'
          initial='out'
          exit='out'
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
