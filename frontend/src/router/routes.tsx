import { routes } from "@/constants";
import { LayoutType } from "@/constants/enum";
import {
  CategoryManagerPage,
  DashboardPage,
  ProductManagerPage,
  HomePage,
  LoginPage,
} from "@/features";
import type { CustomRouteConfig } from "@/types";

export const routeConfigs: CustomRouteConfig[] = [
  {
    path: routes.home,
    element: <HomePage />,
    layout: LayoutType.DEFAULT,
    protected: true,
  },
  {
    path: routes.login,
    element: <LoginPage />,
    layout: LayoutType.DEFAULT,
    protected: false,
  },
  {
    path: routes.dashboard,
    element: <DashboardPage />,
    layout: LayoutType.DASHBOARD,
    protected: true,
  },
  {
    path: routes.categoryManagement,
    element: <CategoryManagerPage />,
    layout: LayoutType.DASHBOARD,
    protected: true,
  },
  {
    path: routes.productManagement,
    element: <ProductManagerPage />,
    layout: LayoutType.DASHBOARD,
    protected: true,
  },
];
