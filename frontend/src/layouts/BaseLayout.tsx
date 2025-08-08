import type { LayoutProps } from '@/types'
import React from 'react'

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex flex-col h-screen">{children}</div>
		</div>
	)
}

export default BaseLayout
