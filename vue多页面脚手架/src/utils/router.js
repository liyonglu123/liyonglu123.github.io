import store from '@/common/store'
import { deepCopy, transformTree } from '@/common/utils/tool'
import { Message } from 'element-ui'
// 初始化权限
export const initPermission = (menuList) => {
        if (!menuList || menuList.length == 0) {
            Message.error('initPermission failed, please login again')
            return
        }
        let permissions = [] // 权限
        menuList.forEach(item => {
            if (item.alias) {
                permissions.push(item.alias)
            }
        })
        store.commit('SET_PERMISSION', permissions);
    }
    // 初始化左侧菜单
export const initMenu = (menuList) => {
        if (!menuList || menuList.length == 0) {
            Message.error('initMenu failed, please login again')
            return
        }
        let menus = [] // 菜单
        menuList.forEach(item => {
            if (item.type == 'menu') {
                menus.push(item);
            }
        })
        menus = deepCopy(menus)
        menus = transformTree(menus);
        menus = menus.filter((item) => {
            return item.parentId == 0
        })
        menus.unshift({
            name: "首页",
            route: "/dashboard"
        })
        store.commit('SET_MENUS', menus);
    }
    // 初始化面包屑导航
export const initBreadcrumb = (menuList) => {
        if (!menuList || menuList.length == 0) {
            Message.error('initBreadcrumb failed, please login again')
            return
        }
        let breadcrumbs = []; // 面包屑
        menuList.forEach(item => {
            if (item.type == 'menu' || item.type == 'page') {
                breadcrumbs.push(item)
            }
        })
        breadcrumbs = deepCopy(breadcrumbs)
        breadcrumbs.forEach(item => {
            let flag = true // 是否继续查找
            let pid = item.parentId
            while (pid != 0 && flag) {
                flag = false
                for (let i in menuList) {
                    let menu = menuList[i]
                    if (pid == menu.id) {
                        flag = true
                        if (menu.type == "page" || menu.type == "menu") {
                            item.parentId = menu.id
                            return
                        } else {
                            pid = menu.parentId
                            break
                        }
                    }
                }
            }
        })
        store.commit('SET_BREADCRUMB', breadcrumbs);
        // Message.error('initPermission failed, please login again')
    }
    // 初始化路由
export const initRouter = (router, menuList) => {
        if (!menuList || menuList.length == 0) {
            Message.error('initRouter failed, please login again')
            return
        }
        let routers = []; // 路由
        routers = deepCopy(store.getters.breadcrumb)
        routers = transformTree(routers);
        routers.forEach((parent) => {
            getChildRouters(parent, 1)
        })
        routers = formatRoutes(routers);
        let unfound = { path: '*', redirect: '/404', hidden: true }
            // 最后添加
        routers.push(unfound);
        router.addRoutes(routers);
        store.commit('SET_ROUTERS', routers);
        // store.dispatch('refreshViewRouter', true);
        // 本地存储以及防止刷新空白
        // setMenus(JSON.stringify(menus));
    }
    // 获取子路由
function getChildRouters(parent, lev, firstParent) {
    let children = parent.children
    if (lev == 1) {
        firstParent = parent
    }
    if (lev > 2) {
        firstParent.children.push(parent)
    }
    if (lev >= 2) {
        parent.children = null
    }
    if (!children) {
        return
    }
    for (let i in children) {
        let item = children[i]
        getChildRouters(item, lev + 1, firstParent)
    }
}

// 路由白名单
// const routerWhiteList = ['/crm/customer/list', '/crm/customer/tele/list', '/hr/mgmt/list', '/contract/bank/list'];
// 动态路由生成
export const formatRoutes = (aMenu) => {
    const aRouter = [];
    aMenu.forEach(oMenu => {
        // id name route type children  四个参数
        // 顶级菜单
        if (oMenu.parentId === 0) {
            oMenu.component = 'Layout';
            //  防止面包屑点击时候无效 == 显示第一个子菜单
            if (oMenu.children) {
                oMenu.redirect = oMenu.children[0].route;
            }
        } else {
            oMenu.component = 'component';
        }
        oMenu.path = oMenu.route;
        let {
            path,
            component,
            redirect,
            name,
            children,
        } = oMenu
        let oRouter = {
            path: path,
            component(resolve) {
                let componentPath = '';
                if (component === 'Layout') {
                    require(['@/common/views/layout/index'], resolve)
                    return
                } else {
                    componentPath = path;
                }
                require([`@/views${componentPath}.vue`], resolve)

            },
            redirect: redirect,
            meta: {
                title: name,
            },
            children: (!children || children && children.length === 0) ? [] : formatRoutes(children),
        }
        aRouter.push(oRouter)

    });
    return aRouter
}