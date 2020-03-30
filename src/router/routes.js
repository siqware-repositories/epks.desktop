const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/Course")
      },
      {
        path: "/grade",
        component: () => import("../pages/Grade.vue")
      },
      {
        path: "/grade-detail",
        component: () => import("../pages/GradeDetail.vue")
      },
      {
        path: "/course",
        component: () => import("../pages/Course.vue")
      },
      {
        path: "/user-management",
        component: () => import("../pages/UserManagement")
      },
    ]
  },
  {
    path: "/",
    component: () => import("../layouts/LoginLayout"),
    children: [
      {
        path: "/login",
        component: () => import("../pages/Login")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
