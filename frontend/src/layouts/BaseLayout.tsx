import type { LayoutProps } from '@/types'
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen">
			<Header />
			<div className="flex flex-col min-h-[calc(100vh-3.5rem)]">{children}</div>
			< Footer/>
		</div>
	)
}

export default BaseLayout
