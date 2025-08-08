import { appSidebar } from '@/constants'
import { changeTitleDocument } from '@/utils'
import { useEffect, type FC, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutChangeTitleProps {
	children?: ReactNode
}

const LayoutChangeTitle: FC<LayoutChangeTitleProps> = ({ children }) => {
	const { pathname } = useLocation()

	useEffect(() => {
		const currentActive = appSidebar.nav?.find((sidebar) => sidebar?.url === pathname)
		changeTitleDocument(currentActive?.title ?? 'Nội thất cao cấp')
	}, [pathname])

	return <>{children}</>
}

export default LayoutChangeTitle