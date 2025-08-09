import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import { RouterProvider } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './assets/css/index.css'
import router from '@/router'
import { ReactQueryProvider, ThemeProvider } from '@/context'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<ReactQueryProvider>
				<RouterProvider router={router} />
				<Toaster position="top-right" />
				<ReactQueryDevtools initialIsOpen={false} />
			</ReactQueryProvider>
		</ThemeProvider>
	</StrictMode>
)
