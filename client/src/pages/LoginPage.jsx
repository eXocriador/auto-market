import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCar, FaGoogle, FaFacebook } from 'react-icons/fa'

export const LoginPage = () => {
   const [username, setUserName] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const { status } = useSelector((state) => state.auth)
   const isAuth = useSelector(checkIsAuth)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
     if (status) toast(status)
     if (isAuth) navigate('/')
   }, [status, isAuth, navigate])

   const handleSubmit = async (e) => {
     e.preventDefault()
     if (!username || !password) {
       toast.error('Будь ласка, заповніть всі поля')
       return
     }

     setIsLoading(true)
     try {
       await dispatch(loginUser({ username, password }))
     } catch (error) {
       console.log(error)
       toast.error('Помилка входу')
     } finally {
       setIsLoading(false)
     }
   }

   return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-md w-full space-y-8">
         <div className="text-center">
           <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
             <FaCar className="text-white text-2xl" />
           </div>
           <h2 className="text-3xl font-bold text-gray-900 mb-2">Ласкаво просимо назад</h2>
           <p className="text-gray-600">Увійдіть до свого облікового запису</p>
         </div>

         <div className="card p-8">
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Ім'я користувача
               </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <FaUser className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                   type="text"
                   placeholder="Введіть ім'я користувача"
                   value={username}
                   onChange={(e) => setUserName(e.target.value)}
                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                   required
                 />
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Пароль
               </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <FaLock className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                   type={showPassword ? "text" : "password"}
                   placeholder="Введіть пароль"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                   required
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
                 >
                   {showPassword ? (
                     <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                   ) : (
                     <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                   )}
                 </button>
               </div>
             </div>

             <div className="flex items-center justify-between">
               <div className="flex items-center">
                 <input
                   id="remember-me"
                   name="remember-me"
                   type="checkbox"
                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                 />
                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                   Запам'ятати мене
                 </label>
               </div>
               <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                 Забули пароль?
               </Link>
             </div>

             <button
               type="submit"
               disabled={isLoading}
               className={`w-full btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               {isLoading ? (
                 <div className="flex items-center justify-center">
                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                   Вхід...
                 </div>
               ) : (
                 'Увійти'
               )}
             </button>

             <div className="relative">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-gray-300" />
               </div>
               <div className="relative flex justify-center text-sm">
                 <span className="px-2 bg-white text-gray-500">Або увійти через</span>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
               <button
                 type="button"
                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
               >
                 <FaGoogle className="h-5 w-5 text-red-500" />
                 <span className="ml-2">Google</span>
               </button>
               <button
                 type="button"
                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
               >
                 <FaFacebook className="h-5 w-5 text-blue-600" />
                 <span className="ml-2">Facebook</span>
               </button>
             </div>
           </form>

           <div className="mt-6 text-center">
             <p className="text-sm text-gray-600">
               Немає облікового запису?{' '}
               <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                 Зареєструватися
               </Link>
             </p>
           </div>
         </div>
       </div>
     </div>
   )
}
