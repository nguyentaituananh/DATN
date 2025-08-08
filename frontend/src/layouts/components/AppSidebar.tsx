import type * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { appSidebar } from '@/constants'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from '@/components/ui/sidebar'
import { Collapsible } from '@/components/ui/collapsible'
import { SearchForm } from '@/layouts/components/SearchForm'
import { VersionSwitcher } from '@/layouts/components/VersionSwitcher'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { pathname } = useLocation()

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher versions={appSidebar.versions} defaultVersion={appSidebar.versions[0]} />
				<SearchForm />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{appSidebar.nav.map((item) => {
					return (
						<Collapsible key={item.title} className="group/collapsible h-10">
							<SidebarGroup key={item.title}>
								<SidebarGroupContent>
									<SidebarMenu>
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild isActive={pathname === item.url} size="default">
												<Link to={item.url}>
													{item.icon && <item.icon className="size-5" />}
													<span className="text-sm font-medium">{item.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</Collapsible>
					)
				})}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
