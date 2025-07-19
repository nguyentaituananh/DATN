import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './assets/css/index.css'
import router from '@/router'
import { ReactQueryProvider, ThemeProvider } from '@/context'

<<<<<<< HEAD
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <OrderProvider>
        <StrictMode>
          <BrowserRouter>
            <AntdApp>
              <App />
            </AntdApp>
          </BrowserRouter>
        </StrictMode>
      </OrderProvider>
    </AuthProvider>
  </QueryClientProvider>
);
=======
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<ReactQueryProvider>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</ReactQueryProvider>
		</ThemeProvider>
	</StrictMode>
)
>>>>>>> tuananh
