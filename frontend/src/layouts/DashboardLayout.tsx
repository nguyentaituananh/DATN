import { useMemo, type PropsWithChildren } from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { AppSidebar } from '@/layouts/components'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/shared/ModeToggle'
import { useLocation } from 'react-router-dom'
import { appSidebar } from '@/constants'

const DashboardLayout = ({ children }: PropsWithChildren) => {
	const { pathname } = useLocation()

	const currentTitlePage = useMemo(() => appSidebar.nav.find((item) => item.url === pathname)?.title, [pathname])

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='overflow-hidden'>
				<header className="bg-background sticky top-0 flex items-center h-16 shrink-0 justify-between border-b pl-4 pr-6 z-50">
					<div className="flex items-center gap-2 h-full">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="/">Eco Decor</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>{currentTitlePage}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<ModeToggle />
				</header>

				<div className="p-6 flex-1">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default DashboardLayout
