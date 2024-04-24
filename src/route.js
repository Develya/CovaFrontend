import {Routes, Route} from 'react-router-dom'

import { CreateTrajet, UpdateTrajet } from './trajetDAO'
import Habitualtrajets from './trajet'
import RegisterOrLogin from './RegisterOrLogin'
import Register from './Register'
import Login from './Login'

const Routecomponent = () => (
    <Routes>
        <Route exact path='/' element={<RegisterOrLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/habitualtrajets' element={<Habitualtrajets/>}/>
        <Route path='/createTrajet' element={<CreateTrajet/>}/>
        <Route path='/updateTrajet/:trajetID' element={<UpdateTrajet />} />
    </Routes>
)

export default Routecomponent