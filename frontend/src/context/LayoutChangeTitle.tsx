import { configSidebar, type configSidebarType } from '@/config'
import { changeTitleDocument } from '@/utils'
import { useEffect, useMemo, type FC, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutChangeTitleProps {
	children?: ReactNode
}

const LayoutChangeTitle: FC<LayoutChangeTitleProps> = ({ children }) => {
	const { pathname } = useLocation()

	const newConfigTable = useMemo(() => {
		return configSidebar?.reduce<(configSidebarType & { activeIndex: number[] })[]>(
			(total, current: configSidebarType, parentIndex: number) => {
				if (current?.isHeader) return total
				if (!current?.children) {
					total.push({
						...current,
						activeIndex: [parentIndex]
					})
				} else {
					current?.children?.forEach((child, index) => {
						const newChild = {
							...child,
							activeIndex: [parentIndex, index]
						}
						total.push(newChild)
					})
				}
				return total
			},
			[]
		)
	}, [])

	useEffect(() => {
		const currentActive = newConfigTable?.find((sidebar) => sidebar?.path === pathname)
		changeTitleDocument(currentActive?.title ?? 'Dashboard')
	}, [pathname, newConfigTable])

	return <>{children}</>
}

export default LayoutChangeTitle
