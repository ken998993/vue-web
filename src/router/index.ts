import { createRouter, createWebHistory } from 'vue-router'

// 路由组件懒加载
const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/Login.vue')
const RegisterView = () => import('../views/Register.vue')
const DetailPageView = () => import('../views/DetailPage.vue')
const ListView = () => import('../views/List.vue')
const FriendsList = () => import('../views/FriendsList.vue')
const FriendInfo = () => import('../views/FriendInfoPage.vue')
const CommentList = () => import('../views/CommentList.vue')
const FriendsRequestList = () => import('../views/FriendsRequestList.vue')
const ProductList = () => import('../views/ProductList.vue')
const MyStore = () => import('../views/MyStore.vue')
const EditProduct = () => import('../views/EditProduct.vue')
const AddProduct = () => import('../views/AddProduct.vue')
const Community = () => import('../views/Community.vue')
const CreateCommunity = () => import('../views/CreateCommunity.vue')
const CreateCharacter = () => import('../views/CreateCharacter.vue')
const CreateJobs = () => import('../views/CreateJobs.vue')
const GameMenu = () => import('../views/GameMenu.vue')
const SelectCharacter = () => import('../views/SelectCharacter.vue')
const TacticalGame = () => import('../views/TacticalGame.vue')
const Crawer = () => import('../views/Crawer.vue')


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }  // 可以在需要时设置页面标题
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Register' }
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailPageView,
    meta: { title: 'Detail' }
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsList,
    meta: { title: 'friends' }
  },
  {
    path: '/list',
    name: 'list',
    component: ListView,
    meta: { title: 'List' }
  },
  {
    path: '/friendInfo',
    name: 'friendInfo',
    component: FriendInfo,
    meta: { title: 'friendInfo' }
  },
  {
    path: '/commentList',
    name: 'commentList',
    component: CommentList,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'CommentList' }
  },
  {
    path: '/friendsRequestList',
    name: 'friendsRequestList',
    component: FriendsRequestList,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'FriendsRequestList' }
  },
  {
    path: '/productList',
    name: 'productList',
    component: ProductList,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'ProductList' }
  },
  {
    path: '/myStore',
    name: 'myStore',
    component: MyStore,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'myStore' }
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProduct,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'addProduct' }
  },
  {
    path: '/editProduct',
    name: 'editProduct',
    component: EditProduct,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'editProduct' }
  },
  {
    path: '/community',
    name: 'community',
    component: Community,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'community' }
  },
  {
    path: '/createCommunity',
    name: 'createCommunity',
    component: CreateCommunity,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'createCommunity' }
  },
  {
    path: '/createCharacter',
    name: 'createCharacter',
    component: CreateCharacter,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'createCharacter' }
  },
  {
    path: '/createJobs',
    name: 'createJobs',
    component: CreateJobs,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'createJobs' }
  },
  {
    path: '/gameMenu',
    name: 'gameMenu',
    component: GameMenu,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'gameMenu' }
  },
  
  {
    path: '/selectCharacter',
    name: 'selectCharacter',
    component: SelectCharacter,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'selectCharacter' }
  },
  {
    path: '/tacticalGame',
    name: 'tacticalGame',
    component: TacticalGame,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'tacticalGame' }
  },
  {
    path: '/createChapter',
    name: 'createChapter',
    component: () => import('@/views/CreateChapter.vue'), // 创建章节故事的页面组件
  },
  {
    path: '/crawer',
    name: 'crawer',
    component: Crawer,  // 将 ChatPage 配置为该路由的组件
    meta: { title: 'crawer' }
  },
  
  
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 设置页面标题
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router
