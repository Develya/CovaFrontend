import {Routes, Route} from 'react-router-dom'

import { CreateTrajet, UpdateTrajet } from './trajetDAO'
import Habitualtrajets from './trajet'
import RegisterOrLogin from './RegisterOrLogin'
import Register from './Register'
import Login from './Login'
import { CreateJourney } from './journeyDAO'
import PropositionTrajet from './proposition_trajet'

const Routecomponent = () => (
    <Routes>
        <Route exact path='/' element={<RegisterOrLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/habitualtrajets/:userID' element={<Habitualtrajets/>}/>
        <Route path='/createTrajet/:userID' element={<CreateTrajet/>}/>
        <Route path='/updateTrajet/:trajetID' element={<UpdateTrajet />} />
        <Route path='/createJourney/:userID/:trajetID/:dayID' element={<CreateJourney/>}/>
        <Route path='/propositiontrajet/:departureAddress/:destinationAddress' element={<PropositionTrajet/>}/>
    </Routes>
)

export default Routecomponent